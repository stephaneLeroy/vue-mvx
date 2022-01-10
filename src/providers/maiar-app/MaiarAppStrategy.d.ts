import { ProxyProvider, WalletConnectProvider } from "@elrondnetwork/erdjs";
import { MaiarAppOption } from "../config";
import IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import IProviderStrategy from "../IProviderStrategy";
declare class MaiarAppStrategy implements IProviderStrategy {
    private eventHandler;
    private _proxy;
    private _walletConnectDeepLink;
    private _walletConnectBridgeUrl;
    private _walletConnect;
    private _connexionManager;
    constructor(eventHandler: IProviderStrategyEventHandler, proxy: ProxyProvider, options: MaiarAppOption);
    id(): string;
    name(): string;
    handleOnClientLogin(): Promise<void>;
    handleOnClientLogout(): void;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
        token: string;
    }): Promise<any>;
    load(): Promise<void> | (() => void);
    provider(): WalletConnectProvider;
    logout(): void;
    get walletConnectBridgeUrl(): string;
    deeplink(url: string): string;
}
export default MaiarAppStrategy;
