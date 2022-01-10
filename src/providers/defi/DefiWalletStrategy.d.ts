import { ExtensionProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import { DefiWalletOption } from "../config";
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
}
export default DefiWalletProviderStrategy;
