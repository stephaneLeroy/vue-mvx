import Vue from 'vue';
import { Transaction } from "@elrondnetwork/erdjs";
declare class ElrondVueStore {
    state: Vue;
    constructor();
    get logged(): boolean;
    get walletAddress(): any;
    get obfuscatedWalletAddress(): string | undefined;
    get maiarApp(): any;
    get ledger(): any;
    get webWallet(): any;
    get defiWallet(): any;
    get provider(): any;
    logout(): void;
    explorerTransactionUrl(transaction: Transaction): string;
}
export default ElrondVueStore;
