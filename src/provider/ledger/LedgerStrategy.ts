import {HWProvider} from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import {Address, ProxyProvider} from "@elrondnetwork/erdjs";
import {LedgerOption} from "../config";
import StorageProvider from "../storage/StorageProvider";
import * as dayjs from "dayjs";

class LedgerProviderManager implements IProviderStrategy {
    private _eventHandler: IProviderStrategyEventHandler;
    private _proxy: ProxyProvider;
    private _hwProvider: HWProvider;
    private _storage = new StorageProvider('ledger-strategy');

    constructor(eventHandler: IProviderStrategyEventHandler, proxy: ProxyProvider, options: LedgerOption) {
        this._eventHandler = eventHandler;
        this._proxy = proxy;
        this._hwProvider = new HWProvider(this._proxy);
        this.init();
    }

    name() {
        return "ledger";
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

    login(options?: { addressIndex?: number, callbackUrl?: string }): Promise<any> {
        const addressIndex = options ? options.addressIndex ? options.addressIndex : 0 : 0;
        return this.init()
            .then(() => {
                this._eventHandler.handleLoginStart(this);
                this._hwProvider
                    .login(options)
                    .then((address) => {
                        this._storage.set({
                            wallet: address,
                            addressIndex: addressIndex
                        }, dayjs().add(30, 'minute'));
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
    }

    provider() {
        return this._hwProvider;
    }
}

export default LedgerProviderManager
