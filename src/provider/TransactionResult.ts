import {TransactionStatus, IProvider, ApiProvider, Transaction} from "@elrondnetwork/erdjs";
import {TransactionWatcher} from "@elrondnetwork/erdjs/out/transactionWatcher";
import {TransactionOnNetwork} from "@elrondnetwork/erdjs/out/transactionOnNetwork";

class TransactionResult {
    private _transaction: Transaction;
    private _proxy: IProvider;
    private _api: ApiProvider;

    constructor(transaction: Transaction, proxy: IProvider, api: ApiProvider) {
        this._transaction = transaction;
        this._proxy = proxy;
        this._api = api;
    }

    async watch() {
        let watcher = new TransactionWatcher(this._transaction.getHash(), this._proxy);
        await watcher.awaitStatus((status: TransactionStatus) => status.isSuccessful() || status.isFailed(), () => {});

        return this._api.getTransaction(this._transaction.getHash()).then((transaction:TransactionOnNetwork ) => {
            if (!transaction) {
                throw new Error("Cannot fetch transaction Information");
            }
            return transaction;
        });
    }
}

export default TransactionResult;
