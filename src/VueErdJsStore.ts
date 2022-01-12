import Vue from 'vue';

class VueErdJsStore {
    state: Vue;

    constructor() {
        this.state = new Vue({
            data: {
                walletAddress: null,
                token: null
            }
        });
    }

    get logged() {
        return this.walletAddress != null
    }
    get walletAddress() {
        return this.state.$data.walletAddress;
    }

    get token() {
        return this.state.$data.token;
    }

    $emit(event: string, ...args: any[]): Vue {
        return this.state.$emit(event, args);
    }

    $on(event: string | string[], callback: Function): Vue {
        return this.state.$on(event, callback);
    }

    $once(event: string | string[], callback: Function): Vue {
        return this.state.$once(event, callback);
    }

    $off(event?: string | string[], callback?: Function): Vue {
        return this.state.$off(event, callback);
    }
}

export default VueErdJsStore;
