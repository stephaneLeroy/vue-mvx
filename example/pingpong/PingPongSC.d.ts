import { IDappProvider, IProvider, Address, Transaction } from "@elrondnetwork/erdjs";
declare class PingPongSC {
    private readonly smartContractAddress;
    private _provider;
    private _proxy;
    constructor(provider: IDappProvider, proxy: IProvider);
    ping(wallet: Address, amount: number): Promise<Transaction>;
    dateToPong(wallet: Address): Promise<import("@elrondnetwork/erdjs").QueryResponse>;
    pingAmount(): Promise<any>;
}
export default PingPongSC;
