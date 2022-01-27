import MaiarAppStrategy from './maiar-app/MaiarAppStrategy';
import LedgerStrategy from './ledger/LedgerStrategy';
import WebWalletStrategy from './web/WebWalletStrategy';
import {TransactionHash, Address, ProxyProvider, ApiProvider, Transaction} from "@elrondnetwork/erdjs";
import providersOptions, {ProviderOption} from "./config";
import IProviderStrategyEventHandler from "./IProviderStrategyEventHandler";
import IProviderStrategy from "./IProviderStrategy";
import DefiWallet from "./defi/DefiWalletStrategy";
import TransactionResult from "./TransactionResult";

const PROVIDER_STRATEGY_STORAGE = "vue-erdjs-strategy";

class Providers implements IProviderStrategyEventHandler {
    currentStrategy?: IProviderStrategy;
    private onLogin: Function;
    private onLogout: Function;
    private onTransaction: Function;
    private _maiarApp: MaiarAppStrategy;
    private _ledger: LedgerStrategy;
    private _webWallet: WebWalletStrategy;
    private _defiWallet: DefiWallet;
    private initialised: boolean;
    private _proxy: ProxyProvider;
    private _api: ApiProvider

    constructor(proxy: ProxyProvider, api: ApiProvider, options: ProviderOption, onLogin: Function, onLogout: Function, onTransaction: Function) {
        this.currentStrategy = undefined;
        this._proxy = proxy;
        this._api = api;
        this.onLogin = onLogin;
        this.onLogout = onLogout;
        this.onTransaction = onTransaction;
        this._maiarApp = new MaiarAppStrategy(this, proxy, options.maiar);
        this._ledger = new LedgerStrategy(this, proxy, options.ledger);
        this._webWallet = new WebWalletStrategy(this, options.webWallet);
        this._defiWallet = new DefiWallet(this, options.defiWallet);
        this.initialised = false;
    }


    async init() {
        if (!window || this.initialised) return;

        console.log("Providers init!")
        this.initialised = true;

        let strategyStorage = window.localStorage.getItem(PROVIDER_STRATEGY_STORAGE);
        if (!strategyStorage) return;

        let strategy = JSON.parse(strategyStorage);

        let storedStrategy;
        console.log("Strategy stored", strategy);
        if (strategy.name === this.maiarApp.id()) {
            storedStrategy = this.maiarApp;
        } else if (strategy.name === this.ledger.id()) {
            storedStrategy = this.ledger;
        } else if (strategy.name === this.webWallet.id()) {
            storedStrategy = this.webWallet
        } else if (strategy.name === this.defiWallet.id()) {
            storedStrategy = this.defiWallet
        }

        if (storedStrategy) {
            storedStrategy.load();
        }
    }

    onUrl(url: Location) {
        if(this.currentStrategy && this.currentStrategy.onUrl) {
            this.currentStrategy.onUrl(url);
        }
    }

    get currentProvider() {
        return this.currentStrategy?.provider();
    }

    get currentProviderName() {
        return this.currentStrategy?.name();
    }

    get ledger() {
        return this._ledger;
    }

    get maiarApp() {
        return this._maiarApp;
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
        return this.signAndSend(transaction).then((result) => this.transactionResult(result));
    }

    async signAndSend(transaction: Transaction) {
        if (!this.currentProvider) {
            throw new Error("No available provider");
        }
        if(this.currentStrategy instanceof WebWalletStrategy) {
            return this.currentProvider.sendTransaction(transaction);
        }
        return this.currentProvider.signTransaction(transaction).then((transaction) => {
            return transaction.send(this._proxy).then(() => transaction);
        });
    }

    transactionResult(transaction: Transaction, delay:number=0) {
        return new TransactionResult(transaction.getHash(), this._proxy, this._api, delay).watch().then((transaction) => {
            this.onTransaction(transaction);
            return transaction;
        });
    }

    handleLoginStart(provider: IProviderStrategy) {
        console.log("Login start", provider);
    }

    handleLogin(provider: IProviderStrategy, address: Address, token?:string) {
        console.log("Login", provider, address, token);
        window.localStorage.setItem(PROVIDER_STRATEGY_STORAGE, JSON.stringify({name: provider.id()}));
        this.currentStrategy = provider;
        this.onLogin(address, token);
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

    handleTransaction(transaction: { status: string, txHash: string}) {
        new TransactionResult(new TransactionHash(transaction.txHash), this._proxy, this._api)
            .watch()
            .then((transaction) => {
                this.onTransaction(transaction);
            })
    }

}

export { providersOptions };
export default Providers;
