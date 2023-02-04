import {readonly} from "vue";
import type {App, Plugin} from "vue";
import type {ITransactionOnNetwork, Address} from "@multiversx/sdk-core";
import {ApiNetworkProvider, ProxyNetworkProvider} from "@multiversx/sdk-network-providers";
import Providers from "./providers/Providers";
import Components, {VueErdjsConnect} from "./components";
import providerConfig, {ElrondEnvEnum, ProviderOption} from "./providers/config";
import VueErdJs from "./VueErdJs";
import VueErdJsAccount from "@/VueErdJsAccount";
import mitt from "mitt";
import type {VueErdEvents} from "@/events/VueErdEvents";

export {ProviderOption, ElrondEnvEnum, VueErdjsConnect}
export const VueErdJsPlugin: Plugin = {
    async install(app: App, options: ProviderOption) {
        console.log("Install VueErdJs plugin", app, options);
        if (!options) {
            options = providerConfig(ElrondEnvEnum.DEVNET);
        }
        const erdApi = new ApiNetworkProvider(options.api.url, {timeout: options.api.timeout});
        const erdProxy = new ProxyNetworkProvider(options.proxy.url, {timeout: options.proxy.timeout});
        const emitter = mitt<VueErdEvents>()
        const providers = new Providers(erdProxy, erdApi, options,
            (address: Address, token?: string) => {
                console.log("Login! => Update address", address)
                VueErdJsAccount.address =  address;
                VueErdJsAccount.token = token;
            },
            () => {
                console.log("Logout!")
                VueErdJsAccount.address =  undefined;
                VueErdJsAccount.token = undefined;
            },
            (transaction: ITransactionOnNetwork) => {
                emitter.emit('transaction', transaction)
            });

        const vueErdJs = new VueErdJs(providers, options.explorer.url, emitter);
        app.config.globalProperties.$erd = vueErdJs;
        app.provide('$erd', vueErdJs)

        // @ts-ignore
        app.config.globalProperties.$erdAccount = readonly(VueErdJsAccount);

        for (const component of Components.entries()) {
            app.component(component[0], component[1])
        }
        app.mixin({
            async beforeCreate() {
                await vueErdJs.providers.init();
            }
        })
    }
}
