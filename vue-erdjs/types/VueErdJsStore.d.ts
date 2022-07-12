import type { Address } from "@elrondnetwork/erdjs";
declare class VueErdJsStore {
    private _walletAddress;
    private _token;
    get logged(): boolean;
    get walletAddress(): Address | undefined;
    set walletAddress(walletAddress: Address | undefined);
    get token(): String | undefined;
    set token(token: String | undefined);
}
export default VueErdJsStore;
