import type {Transaction} from "@multiversx/sdk-core";
import type Providers from "./providers/Providers";
import type {Emitter, Handler} from "mitt";
import type {VueErdEvents} from "@/events/VueErdEvents";

export default class VueErdJs {
    private readonly _providers: Providers;
    private readonly _explorerUrl: string;
    private readonly _emitter: Emitter<VueErdEvents>;


    constructor(providers: Providers, explorerUrl: string, emitter: Emitter<VueErdEvents>) {
        this._providers = providers;
        this._explorerUrl = explorerUrl;
        this._emitter = emitter;
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

    on<Key extends keyof VueErdEvents>(event: Key, handler: Handler<VueErdEvents[Key]>) {
        this._emitter.on(event, handler)
    }
}

