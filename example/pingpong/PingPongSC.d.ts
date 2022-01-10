import { Address } from "@elrondnetwork/erdjs";
import { BigNumber } from "bignumber.js";
import Providers from "../../src/providers/Providers";
declare class PingPongSC {
    private readonly smartContractAddress;
    private _provider;
    constructor(provider: Providers);
    ping(wallet: Address, amount: BigNumber): Promise<import("@elrondnetwork/erdjs/out/transactionOnNetwork").TransactionOnNetwork>;
    didUserPing(wallet: Address): Promise<any>;
    dateToPong(wallet: Address): Promise<import("@elrondnetwork/erdjs").QueryResponse>;
    pingAmount(): Promise<any>;
}
export default PingPongSC;
