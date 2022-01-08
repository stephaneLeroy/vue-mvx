import { Address, WalletProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import {WebWalletOption} from "../config";

class WebWalletProviderStrategy implements IProviderStrategy {
  private _eventHandler: IProviderStrategyEventHandler;
  private _webWallet: WalletProvider;
  private _lastStatus?: string;

  constructor(eventHandler: IProviderStrategyEventHandler, options: WebWalletOption) {
    this._eventHandler = eventHandler;
    this._webWallet = new WalletProvider(`${options.url}/init`);
    this._lastStatus = undefined;
  }

  name() {
    return "web-wallet";
  }

  provider() {
    return this._webWallet;
  }

  load() {
    // Nothing TO DO
  }

  callbackReceived(url: string) {
    const urlSearchParams = new URLSearchParams(url);

    const address = urlSearchParams.get('address');
    if (address) {
      this._eventHandler.handleLogin(this, new Address(address))
    } else {
      this._eventHandler.handleLogout(this)
    }

    const status = urlSearchParams.get('status');
    if(status) {
      this._lastStatus = status;
    } else {
      this._lastStatus = undefined;
    }
  }

  get lastStatus() {
    return this._lastStatus;
  }

  login(options?: { addressIndex?: number, callbackUrl?: string }): Promise<any> {
    const callbackUrl = options ? options.callbackUrl ? options.callbackUrl : '' : ''
    return this._webWallet.login({
      callbackUrl: callbackUrl
    });
  }

  logout() {
    this._webWallet.logout();
  }
}

export default WebWalletProviderStrategy;
