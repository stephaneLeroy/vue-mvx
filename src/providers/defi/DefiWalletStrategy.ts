import { Address, ExtensionProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import {DefiWalletOption} from "../config";
import StorageProvider from "../storage/StorageProvider";
import dayjs from "dayjs";

class DefiWalletProviderStrategy implements IProviderStrategy {
  private _eventHandler: IProviderStrategyEventHandler;
  private _defiWallet: ExtensionProvider;
  private _lastStatus?: string;
  private _storage = new StorageProvider("defi-wallet-strategy");
  private _timeoutInMinutes = 30;

  constructor(eventHandler: IProviderStrategyEventHandler, options: DefiWalletOption) {
    this._eventHandler = eventHandler;
    this._defiWallet = ExtensionProvider.getInstance();
    this._lastStatus = undefined;
  }

  id() {
    return "defi-wallet";
  }

  name() {
      return "Defi Wallet";
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
        this._eventHandler.handleLogin(this, new Address(stored.wallet), stored.token);
      } else {
        console.log("Login failed", success);
      }
    });
  }

  get lastStatus() {
    return this._lastStatus;
  }

  login(options?: { addressIndex?: number, callbackUrl?: string, token?: string }): Promise<any> {
    this._eventHandler.handleLoginStart(this);
    if(!this._defiWallet.isInitialized()) {
      this._defiWallet.init()
    }
    return this._defiWallet.login( options ).then(() => {
        const { signature, address } = this._defiWallet.account;
        const token = signature ? { token: signature } : {};
        this._storage.set( { wallet: address, ...token }, dayjs().add(this._timeoutInMinutes, 'minute'));
        this._eventHandler.handleLogin(this, new Address(address), signature);
    }).catch((error) => {
        this._eventHandler.handleLoginError(this, error);
    });
  }

  logout() {
    this._defiWallet.logout();
  }

}

export default DefiWalletProviderStrategy;
