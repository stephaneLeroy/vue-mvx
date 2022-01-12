import Vue from 'vue';
declare class VueErdJsStore {
    state: Vue;
    constructor();
    get logged(): boolean;
    get walletAddress(): any;
    get token(): any;
}
export default VueErdJsStore;
