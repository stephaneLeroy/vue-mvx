import { Transaction } from "@elrondnetwork/erdjs";
import { WalletProvider } from '@elrondnetwork/erdjs-web-wallet-provider';
import type IProviderStrategy from "../IProviderStrategy";
import type IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import type { WebWalletOption } from "../config";
declare class WebWalletProviderStrategy implements IProviderStrategy {
    private _eventHandler;
    private _webWallet;
    private _lastStatus?;
    private _storage;
    private _timeoutInMinutes;
    constructor(eventHandler: IProviderStrategyEventHandler, options: WebWalletOption);
    id(): string;
    name(): string;
    provider(): WalletProvider;
    callbackReceived(url: string): void;
    get lastStatus(): string | undefined;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
        token?: string;
    }): Promise<any>;
    logout(): void;
    load(): void;
    onUrl(url: Location): void;
    signTransaction(transaction: Transaction, options?: {
        callbackUrl?: string;
    }): Promise<void>;
}
export default WebWalletProviderStrategy;
