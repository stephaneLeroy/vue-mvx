import {HWProvider} from "@elrondnetwork/erdjs";

class LedgerProviderManager {

  constructor(manager, proxy, options) {
    this._manager = manager;
    this._proxy = proxy;
    this._hwProvider = new HWProvider(this._proxy);
    this._addressIndex = 0;
  }

  init() {
    this._hwProvider = new HWProvider(this._proxy);
    return this._hwProvider
      .init()
      .then((success) => {
        if (!success) {
          this._manager.handleLoginError(this);
          throw new Error("Ledger initialisation error")
        }
      });

  }

  async accounts(startIndex, addressesPerPage) {
    return await this.init()
      .then(() => {
        return this._hwProvider.getAccounts(startIndex, addressesPerPage);
      });
  }

  login(accountIndex) {
    console.log(accountIndex);
    this.init()
      .then(() => {
        this._manager.handleLoginStart(this);
        this._hwProvider
          .login({ addressIndex: accountIndex })
          .then((address) => {
            this._addressIndex = accountIndex;
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

  get provider() {
    return this._hwProvider;
  }
}

export default LedgerProviderManager
