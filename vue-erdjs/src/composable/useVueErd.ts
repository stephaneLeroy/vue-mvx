import {
    getCurrentInstance,
} from "vue";
import {Account} from "@multiversx/sdk-core";

export const useVueErd = () => {
    const currentInstance = getCurrentInstance()
    if(!currentInstance) {
        throw new Error("Cannot access vue instance")
    }
    const account = currentInstance.appContext.config.globalProperties.$erdAccount
    const erd = currentInstance.appContext.config.globalProperties.$erd

    const fetchAccount = async () => {
        console.log("fetchAccount", account)
        const erdAccount = new Account(account.address);
        const accountOnNetwork = await erd.proxy.getAccount(account.address);
        console.log("fetchAccount", accountOnNetwork)
        erdAccount.update(accountOnNetwork)
        return erdAccount;
    }
    return {
        account,
        erd,
        fetchAccount
    };
}
