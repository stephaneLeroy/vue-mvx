import { Transaction } from "@elrondnetwork/erdjs";
import { ExtensionProvider } from "@elrondnetwork/erdjs-extension-provider";
import type IProviderStrategy from "../IProviderStrategy";
import type IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import type { DefiWalletOption } from "../config";
declare class DefiWalletProviderStrategy implements IProviderStrategy {
    private _eventHandler;
    private _defiWallet;
    private _lastStatus?;
    private _storage;
    private _timeoutInMinutes;
    constructor(eventHandler: IProviderStrategyEventHandler, options: DefiWalletOption);
    id(): string;
    name(): string;
    provider(): ExtensionProvider;
    load(): void;
    get lastStatus(): string | undefined;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
        token?: string;
    }): Promise<any>;
    logout(): void;
    signTransaction(transaction: Transaction, options?: {
        callbackUrl?: string;
    }): Promise<void>;
}
export default DefiWalletProviderStrategy;
