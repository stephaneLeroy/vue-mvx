import { HWProvider } from "@elrondnetwork/erdjs-hw-provider";
import type IProviderStrategy from "../IProviderStrategy";
import type IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import { Transaction } from "@elrondnetwork/erdjs";
import type { LedgerOption } from "../config";
declare class LedgerProviderManager implements IProviderStrategy {
    private _eventHandler;
    private _hwProvider;
    private _storage;
    private _timeoutInMinutes;
    constructor(eventHandler: IProviderStrategyEventHandler, options: LedgerOption);
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
    signTransaction(transaction: Transaction, options?: {
        callbackUrl?: string;
    }): Promise<void>;
}
export default LedgerProviderManager;
