import { BinaryCodec, AddressValue, SmartContract, IDappProvider, IProvider, Address, Balance, ContractFunction, GasLimit, TransactionPayload, Account, Transaction } from "@elrondnetwork/erdjs";
import {BigIntType, BigUIntType, U64Type} from "@elrondnetwork/erdjs/out";

const Codec = new BinaryCodec();

class PingPongSC {
    private readonly smartContractAddress: string = "erd1qqqqqqqqqqqqqpgquvt728n40ssd8n2qns9jrlqpwq2jc4rj4cysfuj3ad";
    private _provider: IDappProvider;
    private _proxy: IProvider
    constructor(provider: IDappProvider, proxy: IProvider) {
        this._provider = provider;
        this._proxy = proxy;
    }

    async ping(wallet: Address, amount: number) {
        let account = new Account(wallet);
        await account.sync(this._proxy);

        const payload = TransactionPayload.contractCall()
            .setFunction(new ContractFunction("ping"))
            .setArgs([])
            .build();

        const transaction = new Transaction({
            sender: wallet,
            receiver: new Address(this.smartContractAddress),
            gasLimit: new GasLimit(10000000),
            value: Balance.egld(amount),
            data: payload,
        });
        transaction.setNonce(account.nonce);

        return this._provider.sendTransaction(transaction);
    }

    async dateToPong(wallet: Address) {
        let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
        let result = await contract.runQuery(this._proxy, {
            func: new ContractFunction("getTimeToPong"),
            args: [ new AddressValue(wallet) ]
        });
        console.log("datePong", result.returnData)
        return result;
    }

    async pingAmount() {
        let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
        let result = await contract.runQuery(this._proxy, {
            func: new ContractFunction("getPingAmount"),
            args: []
        });
        let decoded = Codec.decodeTopLevel(new Buffer(result.returnData), new BigUIntType());
        return decoded.valueOf().toNumber();
    }
}

export default PingPongSC;
