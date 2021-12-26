import MaiarAppManager from "./maiar-app/maiar-app";
import LedgerManager from './ledger/ledger'

class ProviderStrategy {

  constructor(proxy, options, onLogin, onLogout) {
    this.currentProvider = null;
    this.onLogin = onLogin;
    this.onLogout = onLogout;
    this.walletConnect = new MaiarAppManager(this, proxy, options.maiar);
    this.ledgerConnect = new LedgerManager(this, proxy, options.ledger);
  }

  get provider() {
    return this.currentProvider;
  }

  get ledger() {
    return this.ledgerConnect;
  }

  get maiarApp() {
    return this.walletConnect;
  }

  logout() {
    if(this.currentProvider) {
      this.currentProvider.logout();
    }
    this.handleLogout(this.currentProvider);
  }

  handleLoginStart(provider) {
    console.log("Login start", provider);
  }

  handleLogin(provider, address) {
    console.log("Login", provider, address);
    this.currentProvider = provider;
    this.onLogin(address);
  }

  handleLoginError(provider, err) {
    console.log("Login error", provider, err);
    this.handleLogout(provider);
  }

  handleLogout(provider) {
    console.log("Logout", provider);
    this.currentProvider = null;
    this.onLogout();
  }

}

export default ProviderStrategy;
