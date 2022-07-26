import { SignableMessage, Transaction } from '@elrondnetwork/erdjs';

export type DappOptions = { callbackUrl?: string };

export interface IDappProvider {
    init?(): Promise<boolean>;
    login?(options?: DappOptions): Promise<string>;
    logout(options?: DappOptions): Promise<boolean>;
    getAddress(): Promise<string>;
    isInitialized(): boolean;
    isConnected(): Promise<boolean>;
    sendTransaction?(
        transaction: Transaction,
        options?: DappOptions
    ): Promise<Transaction | void>;
    signTransaction(
        transaction: Transaction,
        options?: DappOptions
    ): Promise<Transaction>;
    signTransactions(
        transactions: Transaction[],
        options?: DappOptions
    ): Promise<Transaction[]>;
    signMessage<T extends SignableMessage>(
        message: T,
        options: DappOptions
    ): Promise<T>;
}
