import { ExtensionProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import { DefiWalletOption } from "../config";
declare class DefiWalletProviderStrategy implements IProviderStrategy {
    private _eventHandler;
    private _defiWallet;
    private _lastStatus?;
    constructor(eventHandler: IProviderStrategyEventHandler, options: DefiWalletOption);
    name(): string;
    provider(): ExtensionProvider;
    load(): void;
    callbackReceived(url: string): void;
    get lastStatus(): string | undefined;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
    }): Promise<any>;
    logout(): void;
    store(wallet: string): void;
}
export default DefiWalletProviderStrategy;
