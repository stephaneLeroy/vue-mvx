import {SmartContractAbi, AbiRegistry, ResultsParser, SmartContract, ContractFunction, TokenPayment, Address, Account } from "@elrondnetwork/erdjs";
import { BigNumber } from "bignumber.js";
import Providers from "../../src/providers/Providers";

class PingPongSC {
    private readonly smartContractAddress: string = "erd1qqqqqqqqqqqqqpgqzdseamvaf8su6mfc423zg8k4t43n0j3j808qeymyrk";
    private _provider: Providers;
    private _abi: any;

    constructor(provider: Providers) {
       this._provider = provider;
    }

    async getSmartContract() {
        if(!this._abi) {
            const abiJson = await fetch('/vue-erdjs/assets/ping-pong-egld.abi.json').then(response => response.json())
            let abiRegistry = AbiRegistry.create(abiJson);
            this._abi = new SmartContractAbi(abiRegistry, ["ping-pong-egld"]);
        }
        return new SmartContract({address: new Address(this.smartContractAddress), abi: this._abi})
    }

    async ping(wallet: Address, amount: BigNumber) {
        let accountAddress = new Address(wallet);
        let account = new Account(accountAddress);
        let accountOnNetwork = await this._provider.proxy.getAccount(accountAddress);
        account.update(accountOnNetwork);

        const contract = await this.getSmartContract()
        const transaction = contract.call({
            func: new ContractFunction("ping"),
            args: [],
            value: TokenPayment.egldFromBigInteger(amount),
            gasLimit: 10000000,
            chainID: await this._provider.chainID()
        });
        transaction.setNonce(account.nonce)
        console.log("Ping!", transaction)

        return await this._provider.sendAndWatch(transaction);
    }

    async pingAmount() {
        const contract = await this.getSmartContract()
        const query = contract.createQuery({
            func: new ContractFunction("getPingAmount"),
            args: []
        })
        const response = await this._provider.proxy.queryContract(query)
        const resultParser = new ResultsParser()
        const result = resultParser.parseQueryResponse(response, contract.getEndpoint("getPingAmount"))
        console.log(result.returnCode.isSuccess());
        console.log(result.returnMessage);
        if(result.returnCode.isSuccess()) {
            console.log(result.values[0].valueOf());
            return result.values[0].valueOf();
        }
        return;
    }
}

export default PingPongSC;
