import Vue from 'vue';

class ElrondVueStore {
    state: Vue;

    constructor() {
        this.state = new Vue({
            data: {
                walletAddress: null
            }
        });
    }

    get walletAddress() {
        return this.state.$data.walletAddress;
    }

}

export default ElrondVueStore;
