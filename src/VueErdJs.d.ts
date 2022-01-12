import { Transaction } from "@elrondnetwork/erdjs";
import VueErdJsStore from "./VueErdJsStore";
import Providers from "./providers/Providers";
export default class VueErdJs {
    private _store;
    private _providers;
    private _explorerUrl;
    constructor(providers: Providers, store: VueErdJsStore, explorerUrl: string);
    get logged(): boolean;
    get walletAddress(): any;
    get token(): any;
    get obfuscatedWalletAddress(): string | undefined;
    get maiarApp(): import("./providers/maiar-app/MaiarAppStrategy").default;
    get ledger(): import("./providers/ledger/LedgerStrategy").default;
    get webWallet(): import("./providers/web/WebWalletStrategy").default;
    get defiWallet(): import("./providers/defi/DefiWalletStrategy").default;
    get providers(): Providers;
    logout(): void;
    explorerTransactionUrl(transaction: Transaction): string;
}
