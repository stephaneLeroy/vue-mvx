import type {Transaction} from "@elrondnetwork/erdjs";
import type Providers from "./providers/Providers";

export default class VueErdJs {
    private _providers: Providers;
    private _explorerUrl: string;

    constructor(providers: Providers, explorerUrl: string) {
        this._providers = providers;
        this._explorerUrl = explorerUrl;
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

