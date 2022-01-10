import Vue from 'vue';
declare class ElrondVueStore {
    state: Vue;
    constructor();
    get walletAddress(): any;
    get token(): any;
}
export default ElrondVueStore;
