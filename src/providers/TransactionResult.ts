import {TransactionHash, TransactionStatus, IProvider, ApiProvider} from "@elrondnetwork/erdjs";
import {TransactionWatcher} from "@elrondnetwork/erdjs/out/transactionWatcher";
import {TransactionOnNetwork} from "@elrondnetwork/erdjs/out/transactionOnNetwork";

class TransactionResult {
    private _hash: TransactionHash;
    private _proxy: IProvider;
    private _api: ApiProvider;
    private _delay: number;

    constructor(hash: TransactionHash, proxy: IProvider, api: ApiProvider, delay:number = 0 ) {
        this._hash = hash;
        this._proxy = proxy;
        this._api = api;
        this._delay = delay;
    }

    async watch() {
        let watcher = new TransactionWatcher(this._hash, this._proxy);
        await watcher.awaitStatus((status: TransactionStatus) => status.isSuccessful() || status.isFailed(), () => {});

        await new Promise(r => setTimeout(r, this._delay));
        return this._api.getTransaction(this._hash).then((transaction:TransactionOnNetwork ) => {
            if (!transaction) {
                throw new Error("Cannot fetch transaction Information");
            }
            return transaction;
        });
    }
}

export default TransactionResult;
