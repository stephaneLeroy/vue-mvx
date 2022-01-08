import { Address, ExtensionProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import {DefiWalletOption} from "../config";
import StorageProvider from "../storage/StorageProvider";
import * as dayjs from "dayjs";

class DefiWalletProviderStrategy implements IProviderStrategy {
  private _eventHandler: IProviderStrategyEventHandler;
  private _defiWallet: ExtensionProvider;
  private _lastStatus?: string;
  private _storage = new StorageProvider("defi-wallet-strategy");

  constructor(eventHandler: IProviderStrategyEventHandler, options: DefiWalletOption) {
    this._eventHandler = eventHandler;
    this._defiWallet = ExtensionProvider.getInstance();
    this._lastStatus = undefined;
  }

  name() {
    return "defi-wallet";
  }

  provider() {
    return this._defiWallet;
  }

  load() {
    let stored = this._storage.get();
    if(!stored) {
        return;
    }

    this._defiWallet.setAddress(stored.wallet);
    this._defiWallet.init().then((success) => {
      if(success) {
        this._eventHandler.handleLogin(this, new Address(stored.wallet));
      } else {
        console.log("Login failed", success);
      }
    });
  }

  get lastStatus() {
    return this._lastStatus;
  }

  login(options?: { addressIndex?: number, callbackUrl?: string }): Promise<any> {
    this._eventHandler.handleLoginStart(this);
    if(!this._defiWallet.isInitialized()) {
      this._defiWallet.init()
    }
    return this._defiWallet.login().then((address) => {
        this._storage.set( { wallet: address}, dayjs().add(30, 'minute'));
        this._eventHandler.handleLogin(this, new Address(address));
    }).catch((error) => {
        this._eventHandler.handleLoginError(this, error);
    });
  }

  logout() {
    this._defiWallet.logout();
  }

}

export default DefiWalletProviderStrategy;
