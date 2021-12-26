import { HWProvider } from "@elrondnetwork/erdjs/out";

class LedgerProviderManager {

  constructor(manager, options) {
    this._manager = manager;
    this._proxy = options.proxy;
    this._hwProvider = new HWProvider(this._proxy);
  }

  init() {
    this._hwProvider = new HWProvider(this._proxy);
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

  login(accountIndex) {
    console.log(accountIndex);
    this.init()
      .then(() => {
        this._manager.handleLoginStart(this);
        this._hwProvider
          .login({ addressIndex: accountIndex })
          .then((address) => {
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

  }
}

export default LedgerProviderManager
