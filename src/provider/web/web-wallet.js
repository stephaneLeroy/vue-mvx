import { WalletProvider } from "@elrondnetwork/erdjs";

class WebWalletProviderManager {

  constructor(manager, options) {
    console.log("WebWallet", options)
    this._manager= manager;
    this._webWallet = new WalletProvider(`${options.url}/init`);
    this._lastStatus = null;
  }

  get name() {
    return "web-wallet";
  }

  get provider() {
    return this._webWallet;
  }

  load() {
    // Nothing TO DO
  }

  callbackReceived(url) {
    const urlSearchParams = new URLSearchParams(url);
    const params = Object.fromEntries(urlSearchParams);

    if (params.address) {
      this._manager.handleLogin(this, params.address)
    } else {
      this._manager.handleLogout(this)
    }
    if(params.status) {
      this._lastStatus = params.status
    }
  }

  get lastStatus() {
    return this._lastStatus;
  }

  login(callbackUrl) {
    this._webWallet.login({
      callbackUrl: callbackUrl
    });
  }

  logout() {
    this._webWallet.logout();
  }
}

export default WebWalletProviderManager;
