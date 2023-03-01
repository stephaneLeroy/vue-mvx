import VueErdjsTab from "./VueErdjsTab.vue"
import VueErdjsConnect from "./VueErdjsConnect.vue";
import XPortalLogin from './xportal/XPortalLogin.vue';
import LedgerLogin from './ledger/LedgerLogin.vue';
import WebWalletLogin from './web/WebWalletLogin.vue';
import DefiWalletLogin from './defi/DefiWalletLogin.vue';

export {VueErdjsConnect};
export default new Map<string, Object>([
    ["VueErdjsTab", VueErdjsTab],
    ["VueErdjsConnect", VueErdjsConnect],
    ["XPortalLogin", XPortalLogin],
    ["LedgerLogin", LedgerLogin],
    ["DefiWalletLogin", DefiWalletLogin],
    ["WebWalletLogin", WebWalletLogin],
]);
