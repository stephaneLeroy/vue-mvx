import type {Address} from "@elrondnetwork/erdjs";
import {reactive} from "vue";
import type {UnwrapNestedRefs} from "@vue/reactivity";

export interface IVueErdJsLogin {
    address: undefined | Address
    token: undefined | string
    logged(): boolean
    obfuscatedAddress(): string | undefined
}

export default reactive({
    address: undefined,
    token: undefined,
    logged() {
        return this.address != undefined
    },

    obfuscatedAddress() {
        if (!this.address) {
            return undefined;
        }
        const keepNbChar = 6;
        return this.address.bech32().slice(0, keepNbChar) +
            '...' +
            this.address.bech32().slice(-keepNbChar);
    }
}) as UnwrapNestedRefs<IVueErdJsLogin>;

