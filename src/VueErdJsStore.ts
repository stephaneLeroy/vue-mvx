import {Ref, ref} from "@vue/reactivity";
import {Address} from "@elrondnetwork/erdjs";

class VueErdJsStore {
    private _walletAddress: Ref<Address | undefined > = ref();
    private _token: Ref<String | undefined > = ref();

    get logged() {
        return this.walletAddress != undefined
    }

    get walletAddress(): Address | undefined {
        return this._walletAddress.value;
    }

    set walletAddress(walletAddress: Address | undefined)  {
        this._walletAddress.value = walletAddress;
    }

    get token() {
        return this._token.value;
    }

    set token(token: String | undefined) {
        this._token.value = token
    }
}

export default VueErdJsStore;
