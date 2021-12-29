import MaiarAppStrategy from "./maiar-app/maiar-app";
import LedgerStrategy from './ledger/ledger';

const PROVIDER_STRATEGY_STORAGE="provider-strategy-storage"

class ProviderStrategy {

  constructor(proxy, options, onLogin, onLogout) {
    this.currentStrategy = null;
    this.onLogin = onLogin;
    this.onLogout = onLogout;
    this._maiarApp = new MaiarAppStrategy(this, proxy, options.maiar);
    this._ledger = new LedgerStrategy(this, proxy, options.ledger);
    this.initialised = false;
  }

  async init() {
    if (!window || this.initialised) return;

    this.initialised = true;

    let strategyStorage = window.localStorage.getItem(PROVIDER_STRATEGY_STORAGE);
    if(!strategyStorage) return;

    let strategy = JSON.parse(strategyStorage);
    let storedStrategy;
    if (strategy.name === this.maiarApp.name) {
      storedStrategy = this.maiarApp;
    } else if (strategy.name === this.ledger.name) {
      storedStrategy = this.ledger;
    }

    storedStrategy.load();
  }

  sendTransaction(transaction) {
    console.log("Current provider", this.currentStrategy.provider);
    return this.currentStrategy.provider.sendTransaction(transaction);
  }

  get provider() {
    return this.currentStrategy.provider;
  }

  get ledger() {
    return this._ledger;
  }

  get maiarApp() {
    return this._maiarApp;
  }

  logout() {
    if(this.currentStrategy) {
      this.currentStrategy.logout();
    }
    this.handleLogout(this.currentStrategy);
  }

  handleLoginStart(provider) {
    console.log("Login start", provider);
  }

  handleLogin(strategy, address) {
    console.log("Login", strategy, address);
    window.localStorage.setItem(PROVIDER_STRATEGY_STORAGE, JSON.stringify({ name: strategy.name }));
    this.currentStrategy = strategy;
    this.onLogin(address);
  }

  handleLoginError(provider, err) {
    console.log("Login error", provider, err);
    this.handleLogout(provider);
  }

  handleLogout(provider) {
    console.log("Logout", provider);
    this.currentStrategy = null;
    this.onLogout();
  }

}

export default ProviderStrategy;
