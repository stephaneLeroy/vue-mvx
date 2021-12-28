import {WalletConnectProvider} from "@elrondnetwork/erdjs";

class MaiarAppManager {

    constructor(manager, proxy, options) {
        console.log("Loading Maiar App");
        this._manager = manager;
        this._proxy = proxy;
        this._walletConnectDeepLink = options.walletConnectDeepLink;
        this._walletConnectBridgeUrl = options.walletConnectBridgeUrl;
        this._onClientLogin = options.onClientLogin;
        this._onClientLogout = options.onClientLogout;
        this._heartbeatInterval = options.heartbeatInterval;
        this._heartbeatDisconnectInterval = null;

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

        setTimeout(() => {that.heartbeat()}, this._heartbeatInterval);
    }

    handleOnClientLogin() {
      this._walletConnect
        .getAddress()
        .then((address) => {
          this._manager.handleLogin(this, address);

          this._walletConnect.walletConnector.on("heartbeat", () => {
            clearInterval(this._heartbeatDisconnectInterval);
            this._heartbeatDisconnectInterval = setInterval(() => {
              console.log("Maiar Wallet Connection Lost");
              this._onClientLogout(this._walletConnect);
              clearInterval(this._heartbeatDisconnectInterval);
            }, 150000);
          });

        })
        .catch((err) => {
          this._manager.handleLoginError(this, err);
        });
    }

    handleOnClientLogout() {
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

    isConnected() {
        return this._walletConnect &&
            "walletConnector" in this._walletConnect &&
            this._walletConnect.walletConnector.connected
    }

    heartbeat() {
        const that = this;
        if(!this.isConnected()) {
            setTimeout(() => {that.heartbeat()}, that._heartbeatInterval);
            return ;
        }
        if (this._walletConnect.walletConnector.peerMeta.description.match(/(iPad|iPhone|iPod)/g)) {
            console.log("heartbeat - iPad/iPhone/iPod : no heartbeat");
            return;
        }

        this._walletConnect.sendCustomMessage({
                method: "heartbeat",
                params: {},
            })
            .then(() => {
                setTimeout(() => {that.heartbeat()}, that._heartbeatInterval);
            })
            .catch(() => {
                that._onClientLogout(that._walletConnect);
                setTimeout(() => {that.heartbeat()}, that._heartbeatInterval);
            });
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

    get onClientLogin() {
        return this._onClientLogin;
    }

    get onClientLogout() {
        return this._onClientLogout;
    }

    get walletConnect() {
        return this._walletConnect;
    }

    get heartbeatInterval() {
        return this._heartbeatInterval;
    }
}

export default MaiarAppManager;
