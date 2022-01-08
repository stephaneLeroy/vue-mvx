import { HWProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import {Address, ProxyProvider} from "@elrondnetwork/erdjs";
import {LedgerOption} from "../config";

const LEDGER_STORAGE="ledger-strategy";

class LedgerProviderManager implements IProviderStrategy {
  private _eventHandler: IProviderStrategyEventHandler;
  private _proxy: ProxyProvider;
  private _hwProvider: HWProvider;
  private _addressIndex: number;

  constructor(eventHandler: IProviderStrategyEventHandler, proxy: ProxyProvider, options: LedgerOption) {
    this._eventHandler = eventHandler;
    this._proxy = proxy;
    this._hwProvider = new HWProvider(this._proxy);
    this._addressIndex = 0;
  }

  name() {
    return "ledger";
  }

  init() {
    return this._hwProvider
      .init()
      .then((success) => {
        if (!success) {
          this._eventHandler.handleLoginError(this, new Error("Initialisation Error"));
        }
      });
  }

  async accounts(startIndex: number, addressesPerPage: number) {
    return await this.init()
      .then(() => {
        return this._hwProvider.getAccounts(startIndex, addressesPerPage);
      });
  }

  login(options?: { addressIndex?: number, callbackUrl?: string }): Promise<any> {
    const addressIndex = options ? options.addressIndex ? options.addressIndex : 0 : 0;
    return this.init()
      .then(() => {
        this._eventHandler.handleLoginStart(this);
        this._hwProvider
          .login(options)
          .then((address) => {
            this._addressIndex = addressIndex;
            this.store(address, this._addressIndex)
            this._eventHandler.handleLogin(this, new Address(address));
          })
          .catch((err) => {
            this._eventHandler.handleLoginError(this, err);
          });
      })
      .catch((error) => {
        this._eventHandler.handleLoginError(this, error);
      });
  }

  logout() {
    this._addressIndex = 0;
  }

  store(wallet: string, addressIndex: number) {
    if (!window) return;

    window.localStorage.setItem(LEDGER_STORAGE, JSON.stringify({
      wallet: wallet,
      addressIndex: addressIndex
    }));
  }

  load() {
    if (!window) return;

    let ledgerStorage = window.localStorage.getItem(LEDGER_STORAGE);
    if(!ledgerStorage) return;

    let ledger = JSON.parse(ledgerStorage);
    this._addressIndex = ledger.addressIndex;
  }

  provider() {
    return this._hwProvider;
  }
}

export default LedgerProviderManager
