import { WalletProvider } from "@elrondnetwork/erdjs";
import IProviderStrategy from "../IProviderStrategy";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import { WebWalletOption } from "../config";
declare class WebWalletProviderManager implements IProviderStrategy {
    private _eventHandler;
    private _webWallet;
    private _lastStatus?;
    constructor(eventHandler: IProviderStrategyEventHandler, options: WebWalletOption);
    name(): string;
    provider(): WalletProvider;
    load(): void;
    callbackReceived(url: string): void;
    get lastStatus(): string | undefined;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
    }): Promise<any>;
    logout(): void;
}
export default WebWalletProviderManager;
