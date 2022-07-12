import { Transaction } from "@elrondnetwork/erdjs";
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import type { MaiarAppOption } from "../config";
import type IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import type IProviderStrategy from "../IProviderStrategy";
declare class MaiarAppStrategy implements IProviderStrategy {
    private eventHandler;
    private _walletConnectDeepLink;
    private _walletConnectBridgeUrl;
    private _walletConnect;
    private _connexionManager;
    constructor(eventHandler: IProviderStrategyEventHandler, options: MaiarAppOption);
    id(): string;
    name(): string;
    handleOnClientLogin(): Promise<void>;
    handleOnClientLogout(): void;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
        token?: string;
    }): Promise<any>;
    load(): Promise<void> | (() => void);
    provider(): WalletConnectProvider;
    logout(): void;
    get walletConnectBridgeUrl(): string;
    deeplink(url: string): string;
    signTransaction(transaction: Transaction, options?: {
        callbackUrl?: string;
    }): Promise<void>;
}
export default MaiarAppStrategy;
