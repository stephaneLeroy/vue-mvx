import { IProvider, ApiProvider, Transaction } from "@elrondnetwork/erdjs";
import { TransactionOnNetwork } from "@elrondnetwork/erdjs/out/transactionOnNetwork";
declare class TransactionResult {
    private _transaction;
    private _proxy;
    private _api;
    constructor(transaction: Transaction, proxy: IProvider, api: ApiProvider);
    watch(): Promise<TransactionOnNetwork>;
}
export default TransactionResult;
