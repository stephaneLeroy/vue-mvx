import type { Transaction } from "@elrondnetwork/erdjs";
import type VueErdJsStore from "./VueErdJsStore";
import type Providers from "./providers/Providers";
export default class VueErdJs {
    private _store;
    private _providers;
    private _explorerUrl;
    constructor(providers: Providers, store: VueErdJsStore | null, explorerUrl: string);
    get logged(): boolean;
    get walletAddress(): import("@elrondnetwork/erdjs").Address | null | undefined;
    get token(): String | null | undefined;
    get obfuscatedWalletAddress(): string | undefined;
    get maiarApp(): import("./providers/maiar-app/MaiarAppStrategy").default;
    get ledger(): import("./providers/ledger/LedgerStrategy").default;
    get webWallet(): import("./providers/web/WebWalletStrategy").default;
    get defiWallet(): import("./providers/defi/DefiWalletStrategy").default;
    get providers(): Providers;
    get proxy(): import("@elrondnetwork/erdjs-network-providers/out").ProxyNetworkProvider;
    get api(): import("@elrondnetwork/erdjs-network-providers/out").ApiNetworkProvider;
    logout(): void;
    explorerTransactionUrl(transaction: Transaction): string;
}
