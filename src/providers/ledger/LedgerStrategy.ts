import {HWProvider} from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import {Address, ProxyProvider} from "@elrondnetwork/erdjs";
import {LedgerOption} from "../config";
import StorageProvider from "../storage/StorageProvider";
import dayjs from "dayjs";

class LedgerProviderManager implements IProviderStrategy {
    private _eventHandler: IProviderStrategyEventHandler;
    private _proxy: ProxyProvider;
    private _hwProvider: HWProvider;
    private _storage = new StorageProvider('ledger-strategy');
    private _timeoutInMinutes = 30;

    constructor(eventHandler: IProviderStrategyEventHandler, proxy: ProxyProvider, options: LedgerOption) {
        this._eventHandler = eventHandler;
        this._proxy = proxy;
        this._hwProvider = new HWProvider(this._proxy);
    }

    id() {
        return "ledger";
    }

    name() {
        return "Ledger Wallet";
    }

    init() {
        return this._hwProvider
            .init()
            .then((success) => {
                if (!success) {
                    let error = new Error("Initialisation Error");
                    this._eventHandler.handleLoginError(this, error);
                    throw error;
                }
            });
    }

    async accounts(startIndex: number, addressesPerPage: number) {
        return await this.init()
            .then(() => {
                return this._hwProvider.getAccounts(startIndex, addressesPerPage);
            });
    }

    login(options?: { addressIndex?: number, callbackUrl?: string, token?: string }): Promise<any> {
        const addressIndex = options ? options.addressIndex ? options.addressIndex : 0 : 0;
        const token = options ? options.token ? options.token : undefined : undefined;

        return this.init()
            .then(() => {
                return token ? this.tokenLogin(addressIndex, token) : this.standardLogin(addressIndex)
            })
            .catch((error) => {
                console.log(error);
                this.logout();
            });
    }

    standardLogin(addressIndex: number): Promise<any>{
        return this._hwProvider.login({addressIndex})
            .then((address) => {
                this._storage.set({
                    wallet: address,
                    addressIndex: addressIndex
                }, dayjs().add(this._timeoutInMinutes, 'minute'));
                this._eventHandler.handleLogin(this, new Address(address));
            })
            .catch((err) => {
                this._eventHandler.handleLoginError(this, err);
            });
    }

    tokenLogin(addressIndex: number, token: string): Promise<any> {
        const that = this;
        return this._hwProvider.tokenLogin({token: Buffer.from(`${token}{}`)})
            .then(({ address, signature }) => {
                let signedToken = signature.hex();
                this._storage.set({
                    wallet: address,
                    addressIndex: addressIndex,
                    token: signedToken
                }, dayjs().add(this._timeoutInMinutes, 'minute'));
                this._eventHandler.handleLogin(this, new Address(address), signedToken);
            })
            .catch((err) => {
                this._eventHandler.handleLoginError(this, err);
            });
    }

    logout() {
        this._hwProvider.logout().then(() => {
            this._storage.clear();
            this._eventHandler.handleLogout(this);
        })
    }

    load() {
        if (!window) return;

        console.log("Loading ledger strategy")
        let stored = this._storage.get();
        if (!stored) return;

        this._eventHandler.handleLogin(this, new Address(stored.wallet));
        this.init();
    }

    provider() {
        return this._hwProvider;
    }
}

export default LedgerProviderManager
