import { HWProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import { ProxyProvider } from "@elrondnetwork/erdjs";
import { LedgerOption } from "../config";
declare class LedgerProviderManager implements IProviderStrategy {
    private _eventHandler;
    private _proxy;
    private _hwProvider;
    private _storage;
    private _timeoutInMinutes;
    constructor(eventHandler: IProviderStrategyEventHandler, proxy: ProxyProvider, options: LedgerOption);
    id(): string;
    name(): string;
    init(): Promise<void>;
    accounts(startIndex: number, addressesPerPage: number): Promise<string[]>;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
        token?: string;
    }): Promise<any>;
    standardLogin(addressIndex: number): Promise<any>;
    tokenLogin(addressIndex: number, token: string): Promise<any>;
    logout(): void;
    load(): void;
    provider(): HWProvider;
}
export default LedgerProviderManager;
