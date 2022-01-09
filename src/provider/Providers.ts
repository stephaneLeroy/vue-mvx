import MaiarAppStrategy from './maiar-app/MaiarAppStrategy';
import LedgerStrategy from './ledger/LedgerStrategy';
import WebWalletStrategy from './web/WebWalletStrategy';
import {Address, ProxyProvider, ApiProvider, Transaction} from "@elrondnetwork/erdjs";
import {ProviderOption} from "./config";
import IProviderStrategyEventHandler from "./IProviderStrategyEventHandler";
import IProviderStrategy from "./IProviderStrategy";
import DefiWallet from "./defi/DefiWalletStrategy";
import TransactionResult from "./TransactionResult";

const PROVIDER_STRATEGY_STORAGE="vue-erdjs-strategy";

class Providers implements IProviderStrategyEventHandler {
  currentStrategy?: IProviderStrategy;
  private onLogin: Function;
  private onLogout: Function;
  private _maiarApp: MaiarAppStrategy;
  private _ledger: LedgerStrategy;
  private _webWallet: WebWalletStrategy;
  private _defiWallet: DefiWallet;
  private initialised: boolean;
  private _proxy: ProxyProvider;
  private _api: ApiProvider

  constructor(proxy: ProxyProvider, api: ApiProvider, options: ProviderOption, onLogin: Function, onLogout: Function) {
    this.currentStrategy = undefined;
    this._proxy = proxy;
    this._api = api;
    this.onLogin = onLogin;
    this.onLogout = onLogout;
    this._maiarApp = new MaiarAppStrategy(this, proxy, options.maiar);
    this._ledger = new LedgerStrategy(this, proxy, options.ledger);
    this._webWallet = new WebWalletStrategy(this, options.webWallet);
    this._defiWallet = new DefiWallet(this, options.defiWallet);
    this.initialised = false;
  }


  async init() {
    if (!window || this.initialised) return;

    this.initialised = true;

    let strategyStorage = window.localStorage.getItem(PROVIDER_STRATEGY_STORAGE);
    if(!strategyStorage) return;

    let strategy = JSON.parse(strategyStorage);

    let storedStrategy;
    console.log("Strategy stored", strategy);
    if (strategy.name === this.maiarApp.name()) {
      storedStrategy = this.maiarApp;
    } else if (strategy.name === this.ledger.name()) {
      storedStrategy = this.ledger;
    } else if(strategy.name === this.webWallet.name()) {
      storedStrategy = this.webWallet
    } else if(strategy.name === this.defiWallet.name()) {
      storedStrategy = this.defiWallet
    }

    if(storedStrategy) {
      storedStrategy.load();
    }
  }

  get currentProvider() {
    if (this.currentStrategy === undefined) {
      return undefined;
    }
    return this.currentStrategy.provider();
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

  logout() {
    if(this.currentStrategy) {
      this.currentStrategy.logout();
      this.handleLogout(this.currentStrategy);
    }
  }

  transactionResult(transaction: Transaction) {
      return new TransactionResult(transaction, this._proxy, this._api).watch();
  }

  handleLoginStart(provider: IProviderStrategy) {
    console.log("Login start", provider);
  }

  handleLogin(provider: IProviderStrategy, address: Address) {
    console.log("Login", provider, address);
    window.localStorage.setItem(PROVIDER_STRATEGY_STORAGE, JSON.stringify({ name: provider.name() }));
    this.currentStrategy = provider;
    this.onLogin(address);
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

}

export default Providers;
