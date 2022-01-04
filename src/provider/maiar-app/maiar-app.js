import { WalletConnectProvider } from "@elrondnetwork/erdjs";
import MaiarConnexionManager from './maiar-connexion-manager'

class MaiarAppManager {

    constructor(manager, proxy, options) {
      this._manager = manager;
      this._proxy = proxy;
      this._walletConnectDeepLink = options.walletConnectDeepLink;
      this._walletConnectBridgeUrl = options.walletConnectBridgeUrl;

      const that = this;
      this._walletConnect = new WalletConnectProvider(
          that._proxy,
          that._walletConnectBridgeUrl,
          {
              onClientLogin: () => that.handleOnClientLogin(),
              onClientLogout: () => that.handleOnClientLogout(),
          }
      );

      if(!this._walletConnect.isInitialized()) {
          this._walletConnect.init();
      }
      this._connexionManager = new MaiarConnexionManager(this._walletConnect, 15000, options.heartbeatInterval, options.heartbeatEnabled);
    }

    get name() {
      return "maiar-app";
    }

    handleOnClientLogin() {
      return this._walletConnect
        .getAddress()
        .then((address) => {
          this._manager.handleLogin(this, address);
          this._connexionManager.startConnexionLostDetection();
        })
        .catch((err) => {
          this._manager.handleLoginError(this, err);
        });
    }

    handleOnClientLogout() {
      console.log("logout requested")
      this._manager.handleLogout(this);
    }

    async login() {
      return await this._walletConnect.login().then((walletConnectUri) => {
        if (walletConnectUri) {
          return {
            qrCodeData: walletConnectUri,
            deeplink: this.deeplink(walletConnectUri)
          }
        }
      });
    }

    load() {
      if(this._connexionManager.isConnected()) {
        return this.handleOnClientLogin();
      }
      return this.handleOnClientLogout;
    }

    get provider() {
        return this._walletConnect;
    }

    logout() {
      this._walletConnect.logout();
    }

    get walletConnectBridgeUrl() {
        return this._walletConnectBridgeUrl;
    }

    deeplink(url) {
      return `${this._walletConnectDeepLink}?wallet-connect=${encodeURIComponent(url)}`;
    }

}

export default MaiarAppManager;
