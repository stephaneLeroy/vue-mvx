import type {Transaction} from "@elrondnetwork/erdjs";
import type VueErdJsStore from "./VueErdJsStore";
import type Providers from "./providers/Providers";

export default class VueErdJs {
    private _store: VueErdJsStore | null;
    private _providers: Providers;
    private _explorerUrl: string;

    constructor(providers: Providers, store: VueErdJsStore | null, explorerUrl: string) {
        this._store = store;
        this._providers = providers;
        this._explorerUrl = explorerUrl;
    }

    get logged() {
        return this._store ? this._store.logged : false
    }

    get walletAddress() {
        return this._store ? this._store.walletAddress : null;
    }

    get token() {
        return this._store ? this._store.token : null;
    }

    get obfuscatedWalletAddress() {
        if (!this.walletAddress || this.walletAddress.isEmpty()) {
            return undefined;
        }
        const keepNbChar = 6;
        return this.walletAddress.bech32().slice(0, keepNbChar) +
            '...' +
            this.walletAddress.bech32().slice(-keepNbChar);
    }

    get maiarApp() {
        return this._providers.maiarApp;
    }

    get ledger() {
        return this._providers.ledger;
    }

    get webWallet() {
        return this._providers.webWallet;
    }

    get defiWallet() {
        return this._providers.defiWallet;
    }

    get providers() {
        return this._providers;
    }

    get proxy() {
        return this.providers.proxy;
    }

    get api() {
        return this.providers.api;
    }

    logout() {
        this.providers.logout();
    }

    explorerTransactionUrl(transaction: Transaction) {
        return `${this._explorerUrl}/transactions/${transaction.getHash()}`;
    }
}

