import XPortalAppStrategy from './xportal-app/XPortalAppStrategy';
import LedgerStrategy from './ledger/LedgerStrategy';
import WebWalletStrategy from './web/WebWalletStrategy';
import {Address, Transaction, TransactionWatcher} from "@multiversx/sdk-core";
import type {ApiNetworkProvider, ProxyNetworkProvider, NetworkConfig} from "@multiversx/sdk-network-providers";
import providersOptions, {ProviderOption} from "./config";
import type IProviderStrategyEventHandler from "./IProviderStrategyEventHandler";
import type IProviderStrategy from "./IProviderStrategy";
import DefiWallet from "./defi/DefiWalletStrategy";
import {XPortalHubStrategy} from "@/providers/xportal-hub/XPortalHubStrategy";

const PROVIDER_STRATEGY_STORAGE = "vue-erdjs-strategy";

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

    async signAndSend(transaction: Transaction) {
        if (!this.currentProvider) {
            throw new Error("No available provider");
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
        return new TransactionWatcher(this._proxy, pollingInterval, timeout)
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

}

export {providersOptions};
export default Providers;
