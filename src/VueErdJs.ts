import { Transaction } from "@elrondnetwork/erdjs";
import VueErdJsStore from "./VueErdJsStore";
import Providers from "./providers/Providers";
import Vue from "vue";

export default class VueErdJs {
    private _store: VueErdJsStore;
    private _providers: Providers;
    private _explorerUrl: string;

    constructor(providers: Providers, store: VueErdJsStore, explorerUrl: string) {
        this._store = store;
        this._providers = providers;
        this._explorerUrl = explorerUrl;
    }

    get logged() {
        return this._store.logged
    }

    get walletAddress() {
        return this._store.walletAddress;
    }

    get token() {
        return this._store.token;
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

    $on(event: string | string[], callback: Function): Vue {
        return this._store.$on(event, callback);
    }

    $once(event: string | string[], callback: Function): Vue {
        return this._store.$once(event, callback);
    }

    $off(event?: string | string[], callback?: Function): Vue {
        return this._store.$off(event, callback);
    }
}

