import XPortalAppStrategy from './xportal-app/XPortalAppStrategy';
import LedgerStrategy from './ledger/LedgerStrategy';
import WebWalletStrategy from './web/WebWalletStrategy';
import {Address, Transaction, TransactionWatcher, TransactionVersion} from "@multiversx/sdk-core";
import type {ApiNetworkProvider, ProxyNetworkProvider, NetworkConfig} from "@multiversx/sdk-network-providers";
import providersOptions, {ProviderOption} from "./config";
import type IProviderStrategyEventHandler from "./IProviderStrategyEventHandler";
import type IProviderStrategy from "./IProviderStrategy";
import DefiWallet from "./defi/DefiWalletStrategy";
import {XPortalHubStrategy} from "@/providers/xportal-hub/XPortalHubStrategy";
import {GuardianData} from "@multiversx/sdk-network-providers/out/accounts";
import {Signature} from "@multiversx/sdk-core/out/signature";

const PROVIDER_STRATEGY_STORAGE = "vue-erdjs-strategy";

interface LoggedAccount {
    address: Address;
    guardian: GuardianData;
}

class Providers implements IProviderStrategyEventHandler {
    currentStrategy?: IProviderStrategy;
    private options: ProviderOption;
    private readonly onLogin: Function;
    private readonly onLogout: Function;
    private readonly onTransaction: Function;
    private _xportalApp: XPortalAppStrategy | undefined;
    private _ledger: LedgerStrategy | undefined;
    private _webWallet: WebWalletStrategy | undefined;
    private _defiWallet: DefiWallet | undefined;
    private _xportalHub: XPortalHubStrategy | undefined;
    private state: "created" | "loading" | "initialised" = "created";
    private readonly _proxy: ProxyNetworkProvider;
    private readonly _api: ApiNetworkProvider
    private _networkConfig: NetworkConfig | undefined;
    private loggedAccount?: LoggedAccount | undefined;
    private requiresGuarding: boolean | undefined;

    constructor(proxy: ProxyNetworkProvider, api: ApiNetworkProvider, options: ProviderOption, onLogin: Function, onLogout: Function, onTransaction: Function) {
        this.options = options;
        this.currentStrategy = undefined;
        this._proxy = proxy;
        this._api = api;
        this.onLogin = onLogin;
        this.onLogout = onLogout;
        this.onTransaction = onTransaction;
        this.state = "created";
    }

    async init() {
        if (!window || this.state === "loading" || this.state === "initialised") return;
        console.log("Providers init!")
        this.state = "loading";

        this._networkConfig = await this._proxy.getNetworkConfig();

        this._xportalApp = new XPortalAppStrategy(this, this.options.maiar, this._networkConfig.ChainID);
        this._ledger = new LedgerStrategy(this, this.options.ledger);
        this._webWallet = new WebWalletStrategy(this, this.options.webWallet);
        this._defiWallet = new DefiWallet(this, this.options.defiWallet);
        this._xportalHub = new XPortalHubStrategy(this);

        // Check if we are in a webview with accessToken (no user action required)
        this._xportalHub.load();

        let strategyStorage = window.localStorage.getItem(PROVIDER_STRATEGY_STORAGE);
        if (!strategyStorage) return;

        let strategy = JSON.parse(strategyStorage);

        let storedStrategy;
        console.log("Strategy stored", strategy);
        if (strategy.name === this.xportalApp?.id()) {
            storedStrategy = this.xportalApp;
        } else if (strategy.name === this.ledger?.id()) {
            storedStrategy = this.ledger;
        } else if (strategy.name === this.webWallet?.id()) {
            storedStrategy = this.webWallet
        } else if (strategy.name === this.defiWallet?.id()) {
            storedStrategy = this.defiWallet
        }

        if (storedStrategy) {
            await storedStrategy.load();
        }
        this.state = "initialised";
    }

    async setLoggedAccount(address: Address) {
        try {
            const guardian = await this.getGuardian(address);
            this.loggedAccount = {
                address: address,
                guardian: guardian,
            };
            this.requiresGuarding = this.loggedAccount.guardian.guarded;
        } catch (error) {
            console.error('Failed to set logged account:', error);
        }
    }

    onUrl(url: Location) {
        console.log("On Url", this.currentStrategy, url)
        if (this.currentStrategy && this.currentStrategy.onUrl) {
            this.currentStrategy.onUrl(url);
        }
    }

    get currentProvider() {
        return this.currentStrategy;
    }

    get currentProviderName() {
        return this.currentStrategy?.name();
    }

    get ledger() {
        return this._ledger;
    }

    get xportalApp() {
        return this._xportalApp;
    }

    get webWallet() {
        return this._webWallet;
    }

    get defiWallet() {
        return this._defiWallet;
    }

    get proxy() {
        return this._proxy;
    }

    get api() {
        return this._api;
    }

    get chainID() {
        if (!this._networkConfig) {
            throw new Error('Network config not initialized')
        }
        return this._networkConfig.ChainID;
    }

    logout() {
        if (this.currentStrategy) {
            this.currentStrategy.logout();
            this.handleLogout(this.currentStrategy);
        }
    }

    sendAndWatch(transaction: Transaction) {
        if (!this.currentProvider) {
            throw new Error("No available provider");
        }
        return this.signAndSend(transaction).then((result) => {
            // Webwallet doesn't return a signed transaction so we cannot send it.
            if(!result) return;
            return this.transactionResult(result)
        });
    }

    // ref: https://github.com/elrond-giants/erd-react-hooks/blob/54d13c245f4c20fa1e09dba14f2c78a541149487/src/utils.ts#L34
    async guardTransactions(transactions: Transaction[], code: string) {
        transactions.forEach((tx) => {
            const guardianAddress = this.loggedAccount?.guardian.getCurrentGuardianAddress();
            if ( guardianAddress != undefined) {
                tx.setGuardian(guardianAddress);
                tx.setVersion(TransactionVersion.withTxOptions());
                const options = tx.getOptions();
                if (!options.isWithGuardian()) {
                    options.setWithGuardian();  
                    tx.setOptions(options);
                }
            }
        })
        const url = this.options.tools.url + "/guardian/sign-multiple-transactions"
        const body = {
            code,
            transactions: transactions.map(tx => tx.toSendable()),
        };
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
        const result = await response.json();
        const signatures = result.data.transactions.map(
            (t: { guardianSignature: string }) => t.guardianSignature
        );
        return transactions.map((tx, i) => {
            tx.applyGuardianSignature(new Signature(signatures[i]));
            return tx;
        });
    }

    async signAndSend(transaction: Transaction, guard2FACode?: string) {
        if (!this.currentProvider) {
            throw new Error("No available provider");
        }
        if ( this.requiresGuarding && guard2FACode != undefined) {
            const guardedTx = await this.guardTransactions([transaction], guard2FACode);
            transaction = guardedTx[0];
        }
        return this.currentProvider.signTransaction(transaction).then((signedTransaction) => {
            // Webwallet doesn't return a signed transaction so we cannot send it.
            if(!signedTransaction) return;
            return this._api.sendTransaction(signedTransaction).then(() => signedTransaction);
        });
    }

    async signTransactions(transactions: Transaction[]) {
        if (!this.currentProvider) {
            throw new Error("No available provider");
        }
        return this.currentProvider.signTransactions(transactions);
    }

    async sendTransaction(transaction: Transaction){
        return this._api.sendTransaction(transaction).then(() => transaction);
    }

    transactionResult(transaction: Transaction, pollingInterval?: number, timeout?: number ) {
        const options = {
            pollingIntervalMilliseconds: pollingInterval,
            timeoutMilliseconds: timeout,
        };
        return new TransactionWatcher(this._proxy, options)
            .awaitCompleted(transaction)
            .then((transactionOnNetwork) => {
                this.onTransaction(transactionOnNetwork)
                return transactionOnNetwork;
            })
    }

    handleLoginStart(provider: IProviderStrategy) {
        console.log("Login start", provider);
    }

    handleLogin(provider: IProviderStrategy, address?: Address, token?: string) {
        console.log("Login", provider, address, token);
        window.localStorage.setItem(PROVIDER_STRATEGY_STORAGE, JSON.stringify({name: provider.id()}));
        this.currentStrategy = provider;
        if(address) {
            this.onLogin(address, token);
        }
    }

    handleLoginError(provider: IProviderStrategy, err: Error) {
        console.log("Login error", provider, err);
        this.handleLogout(provider);
    }

    handleLogout(provider: IProviderStrategy) {
        console.log("Logout", provider);
        window.localStorage.removeItem(PROVIDER_STRATEGY_STORAGE);
        this.currentStrategy = undefined;
        this.onLogout();
    }

    handleTransaction(transaction: Transaction) {
        this._proxy.sendTransaction(transaction).then(() => this.transactionResult(transaction));
    }

    shouldApplyGuardianSignature() {
        const strategy_id = this.currentStrategy?.id() ?? '';
        return [
            'ledger',
            'xportal-app',
        ].includes(strategy_id);
    };

    async getGuardian(address: Address) {
        try {
            if (this.loggedAccount === undefined) {
                throw new Error('Logged account is undefined');
                // Or return a default value
                // return new GuardianData({ guarded: false });
            }
            const guardian = await this._proxy.getGuardianData(address);
            return guardian;
        } catch (e) {
            return new GuardianData({ guarded: false });
        }
    }

}

export {providersOptions};
export default Providers;
