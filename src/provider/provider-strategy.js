import MaiarAppStrategy from "./maiar-app/maiar-app";
import LedgerStrategy from './ledger/ledger'

class ProviderStrategy {

  constructor(proxy, options, onLogin, onLogout) {
    this.currentStrategy = null;
    this.onLogin = onLogin;
    this.onLogout = onLogout;
    this.walletStrategy = new MaiarAppStrategy(this, proxy, options.maiar);
    this.ledgerStrategy = new LedgerStrategy(this, proxy, options.ledger);
  }

  sendTransaction(transaction) {
    console.log("Current provider", this.currentStrategy.provider);
    return this.currentStrategy.provider.sendTransaction(transaction);
  }

  get provider() {
    return this.currentStrategy.provider;
  }

  get ledger() {
    return this.ledgerStrategy;
  }

  get maiarApp() {
    return this.walletStrategy;
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
