import { HWProvider } from "@elrondnetwork/erdjs";

const LEDGER_STORAGE="ledger-strategy-storage"

class LedgerProviderManager {

  constructor(manager, proxy, options) {
    this._manager = manager;
    this._proxy = proxy;
    this._hwProvider = new HWProvider(this._proxy);
    this._addressIndex = 0;
  }

  get name() {
    return "ledger";
  }

  init() {
    return this._hwProvider
      .init()
      .then((success) => {
        if (!success) {
          this._manager.handleLoginError(this);
        }
      });
  }

  async accounts(startIndex, addressesPerPage) {
    return await this.init()
      .then(() => {
        return this._hwProvider.getAccounts(startIndex, addressesPerPage);
      });
  }

  login(addressIndex) {
    this.init()
      .then(() => {
        this._manager.handleLoginStart(this);
        this._hwProvider
          .login({ addressIndex: addressIndex })
          .then((address) => {
            this.store(address, addressIndex)
            this._addressIndex = addressIndex;
            this._manager.handleLogin(this, address);
          })
          .catch((err) => {
            this._manager.handleLoginError(this, err);
          });
      })
      .catch((error) => {
        this._manager.handleLoginError(this, error);
      });
  }

  logout() {
    this._addressIndex = 0;
  }

  store(wallet, addressIndex) {
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

  get provider() {
    return this._hwProvider;
  }
}

export default LedgerProviderManager
