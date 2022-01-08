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
    constructor(eventHandler: IProviderStrategyEventHandler, proxy: ProxyProvider, options: LedgerOption);
    name(): string;
    init(): Promise<void>;
    accounts(startIndex: number, addressesPerPage: number): Promise<string[]>;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
    }): Promise<any>;
    logout(): void;
    load(): void;
    provider(): HWProvider;
}
export default LedgerProviderManager;
