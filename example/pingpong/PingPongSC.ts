import { BooleanType, BigUIntType, BinaryCodec, AddressValue, SmartContract, IDappProvider, IProvider, Address, Balance, ContractFunction, GasLimit, TransactionPayload, Account, Transaction } from "@elrondnetwork/erdjs";
import { BigNumber } from "bignumber.js";
import Providers from "../../src/provider/Providers";

const Codec = new BinaryCodec();

class PingPongSC {
    private readonly smartContractAddress: string = "erd1qqqqqqqqqqqqqpgqcsu3pkp7jhp72028vag8lz58luj9garw0eqqn9j476";
    private _provider: Providers;
    constructor(provider: Providers) {
        this._provider = provider;
    }

    async ping(wallet: Address, amount: BigNumber) {
        let account = new Account(wallet);
        await account.sync(this._provider.proxy);

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
        return this._provider.sendAndWatch(transaction);
    }

    async didUserPing(wallet: Address) {
        let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
        let result = await contract.runQuery(this._provider.proxy, {
            func: new ContractFunction("didUserPing"),
            args: [ new AddressValue(wallet) ]
        });
        let decoded = Codec.decodeTopLevel(new Buffer(result.outputUntyped()[0]), new BooleanType());
        console.log("didUserPing", decoded.valueOf())
        return decoded.valueOf();
    }

    async dateToPong(wallet: Address) {
        let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
        let result = await contract.runQuery(this._provider.proxy, {
            func: new ContractFunction("getTimeToPong"),
            args: [ new AddressValue(wallet) ]
        });
        console.log("datePong", result.returnData)
        return result;
    }

    async pingAmount() {
        let contract = new SmartContract({ address: new Address(this.smartContractAddress) });
        let result = await contract.runQuery(this._provider.proxy, {
            func: new ContractFunction("getPingAmount"),
            args: []
        });
        let decoded = Codec.decodeTopLevel(new Buffer(result.outputUntyped()[0]), new BigUIntType());
        console.log("getPingAmount", decoded.valueOf())
        return decoded.valueOf();
    }
}

export default PingPongSC;
