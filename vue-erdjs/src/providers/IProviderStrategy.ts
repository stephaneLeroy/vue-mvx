import type {Transaction} from "@multiversx/sdk-core";

interface IProviderStrategy {
    id(): string;

    name(): string;

    login(options?: { addressIndex?: number, callbackUrl?: string, token?: string }): Promise<any>;

    logout(): void;

    load(): void;

    onUrl?(url: Location): void;

    signTransaction(transaction: Transaction, options?: {
        callbackUrl?: string;
    }): Promise<Transaction | void>;

    signTransactions(transactions: Transaction[], options?: {
        callbackUrl?: string;
    }): Promise<Transaction[] | void>;
}

export default IProviderStrategy;
