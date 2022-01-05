import { Address, ProxyProvider, WalletConnectProvider } from "@elrondnetwork/erdjs";
import MaiarConnexionManager from './MaiarConnexionManager'
import {MaiarAppOption} from "../config";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import IProviderStrategy from "../IProviderStrategy";

class MaiarAppLoginData {
  qrCodeData: string;
  deeplink: string;

  constructor(qrCodeData: string, deeplink: string) {
    this.deeplink = deeplink;
    this.qrCodeData = qrCodeData;
  }

}

class MaiarAppStrategy implements IProviderStrategy {
  private eventHandler: IProviderStrategyEventHandler;
  private _proxy: ProxyProvider;
  private _walletConnectDeepLink: string;
  private _walletConnectBridgeUrl: string;
  private _walletConnect: WalletConnectProvider;
  private _connexionManager: MaiarConnexionManager;

    constructor(eventHandler: IProviderStrategyEventHandler, proxy: ProxyProvider, options: MaiarAppOption) {
      this.eventHandler = eventHandler;
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
      this._connexionManager = new MaiarConnexionManager(this._walletConnect, options);
    }

    name() {
      return "maiar-app";
    }

    handleOnClientLogin() {
      return this._walletConnect
        .getAddress()
        .then((address) => {
          this.eventHandler.handleLogin(this, new Address(address));
          this._connexionManager.startConnexionLostDetection();
        })
        .catch((err) => {
          this.eventHandler.handleLoginError(this, err);
        });
    }

    handleOnClientLogout() {
      console.log("logout requested")
      this.eventHandler.handleLogout(this);
    }

    login(options?: { addressIndex?: number, callbackUrl?: string }): Promise<any> {
      return this._walletConnect.login().then((walletConnectUri) => {
        if (walletConnectUri) {
          return new MaiarAppLoginData(walletConnectUri, this.deeplink(walletConnectUri))
        }
      });
    }

    load() {
      if(this._connexionManager.isConnected()) {
        return this.handleOnClientLogin();
      }
      return this.handleOnClientLogout;
    }

    provider() {
        return this._walletConnect;
    }

    logout() {
      this._walletConnect.logout();
    }

    get walletConnectBridgeUrl() {
        return this._walletConnectBridgeUrl;
    }

    deeplink(url: string) {
      return `${this._walletConnectDeepLink}?wallet-connect=${encodeURIComponent(url)}`;
    }

}

export default MaiarAppStrategy;