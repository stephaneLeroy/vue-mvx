import { Address, ExtensionProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import {DefiWalletOption} from "../config";


const DEFI_WALLET_STORAGE="defi-wallet-strategy";

class DefiWalletProviderStrategy implements IProviderStrategy {
  private _eventHandler: IProviderStrategyEventHandler;
  private _defiWallet: ExtensionProvider;
  private _lastStatus?: string;

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
    if (!window) return;

    let defiWalletStorage = window.localStorage.getItem(DEFI_WALLET_STORAGE);
    if(!defiWalletStorage) return;

    let defiWallet = JSON.parse(defiWalletStorage);
    this._defiWallet.setAddress(defiWallet.wallet);
    this._defiWallet.init().then((success) => {
      if(success) {
        this._eventHandler.handleLogin(this, new Address(defiWallet.wallet));
      } else {
        console.log("Login failed", success);
      }
    });
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
  //const callbackUrl = options ? options.callbackUrl ? options.callbackUrl : '' : ''
    this._eventHandler.handleLoginStart(this);
    return this._defiWallet.login().then((address) => {
        this.store(address);
        this._eventHandler.handleLogin(this, new Address(address));
    }).catch((error) => {
        this._eventHandler.handleLoginError(this, error);
    });
  }

  logout() {
    this._defiWallet.logout();
  }

  store(wallet: string) {
    if (!window) return;

    window.localStorage.setItem(DEFI_WALLET_STORAGE, JSON.stringify({
      wallet: wallet
    }));
  }
}

export default DefiWalletProviderStrategy;
