import MaiarAppStrategy from './maiar-app/MaiarAppStrategy';
import LedgerStrategy from './ledger/LedgerStrategy';
import WebWalletStrategy from './web/web-wallet';
import { Address, ProxyProvider, Transaction } from "@elrondnetwork/erdjs";
import { ProviderOption } from "./config";
import IProviderStrategyEventHandler from "./IProviderStrategyEventHandler";
import IProviderStrategy from "./IProviderStrategy";
declare class Providers implements IProviderStrategyEventHandler {
    currentStrategy?: IProviderStrategy;
    private onLogin;
    private onLogout;
    private _maiarApp;
    private _ledger;
    private _webWallet;
    private initialised;
    constructor(proxy: ProxyProvider, options: ProviderOption, onLogin: Function, onLogout: Function);
    init(): Promise<void>;
    sendTransaction(transaction: Transaction): Promise<Transaction>;
    get provider(): (() => import("@elrondnetwork/erdjs").IDappProvider) | undefined;
    get ledger(): LedgerStrategy;
    get maiarApp(): MaiarAppStrategy;
    get webWallet(): WebWalletStrategy;
    logout(): void;
    handleLoginStart(provider: IProviderStrategy): void;
    handleLogin(provider: IProviderStrategy, address: Address): void;
    handleLoginError(provider: IProviderStrategy, err: Error): void;
    handleLogout(provider: IProviderStrategy): void;
}
export default Providers;
