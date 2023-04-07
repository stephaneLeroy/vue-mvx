import type IProviderStrategy from "@/providers/IProviderStrategy";
import type {Transaction} from "@multiversx/sdk-core";
import type IProviderStrategyEventHandler from "@/providers/IProviderStrategyEventHandler";
import {decodeNativeAuthToken} from "@/providers/xportal-hub/native-auth/decodeNativeAuthToken";
import type {DecodedNativeAuthTokenType} from "@/providers/xportal-hub/native-auth/decodeNativeAuthToken";
import {Address} from "@multiversx/sdk-core";
import {XPortalHubProvider} from "@/providers/xportal-hub/XPortalHubProvider";
import StorageProvider from "@/providers/storage/StorageProvider";
import dayjs from "dayjs";

export class XPortalHubStrategy implements IProviderStrategy {
    private _eventHandler: IProviderStrategyEventHandler;
    private _webviewProvider: XPortalHubProvider;
    private _storage = new StorageProvider('xportal-hub');

    constructor(eventHandler: IProviderStrategyEventHandler) {
        this._eventHandler = eventHandler;
        this._webviewProvider = new XPortalHubProvider();
    }

    id(): string {
        return "xportal-hub";
    }

    name(): string {
        return "xPortal hub";
    }

    load(): void {
        const auth = this.readAuthToken();
        if(auth && auth.decoded.getExpiration() > 0) {
            this._storage.set(auth, dayjs().add(auth.decoded.getExpiration(), 'seconds'));
        } else {
            console.info("No xportal hub token or it has expired");
        }
        const storage = this._storage.get()
        if(storage) {
            this._eventHandler.handleLogin(this, new Address(storage.decoded.address), storage.token);
        }
    }

    readAuthToken(): { token: string, decoded: DecodedNativeAuthTokenType } | null {
        const search = typeof window !== 'undefined' ? window?.location?.search : '';
        const urlSearchParams = new URLSearchParams(search) as any;
        const searchParams = Object.fromEntries(urlSearchParams);

        const token = searchParams?.accessToken;
        const decoded = decodeNativeAuthToken(token);
        console.log("Decoded xPortal Hub token", decoded)
        if(!decoded) {
            return null;
        }
        return { token, decoded };
    }

    login(options?: { addressIndex?: number; callbackUrl?: string; token?: string }): Promise<any> {
        return Promise.resolve(undefined);
    }

    logout(): void {
        this._storage.clear();
        this._webviewProvider.logout().then(() => {
            console.log("Logout from xportal hub");
        });
    }

    signTransaction(transaction: Transaction, options?: { callbackUrl?: string }): Promise< Transaction | void> {
        return this._webviewProvider.signTransaction(transaction);
    }

    signTransactions(transactions: [], options?: { callbackUrl?: string }): Promise<Transaction[] | void> {
        return this._webviewProvider.signTransactions(transactions);
    }

    onUrl(url: Location) {
        return;
    }

}
