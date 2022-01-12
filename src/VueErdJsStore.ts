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

}

export default VueErdJsStore;
