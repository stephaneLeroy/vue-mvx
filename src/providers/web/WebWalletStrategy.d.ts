import { WalletProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import { WebWalletOption } from "../config";
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
}
export default WebWalletProviderStrategy;
