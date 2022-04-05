import {App, inject, Plugin} from "vue";
import {Transaction, Address, ApiProvider, NetworkConfig, ProxyProvider} from "@elrondnetwork/erdjs";
import Providers from "./providers/Providers";
import VueErdJsStore from './VueErdJsStore';
import Components, { VueErdjsConnect } from "./components";
import providerConfig, {ElrondEnvEnum, ProviderOption} from "./providers/config";
import VueErdJs from "./VueErdJs";

const ErdJsSymbol = Symbol();
const vueErdJsStore = new VueErdJsStore();
export { vueErdJsStore, ProviderOption, ElrondEnvEnum, VueErdjsConnect }
export const VueErdJsPlugin: Plugin = {
    install(app: App, options: ProviderOption) {
        if(!options) {
            options = providerConfig(ElrondEnvEnum.DEVNET);
        }
        const erdApi = new ApiProvider(options.api.url, {timeout: options.api.timeout});
        const erdProxy = new ProxyProvider(options.proxy.url, {timeout: options.proxy.timeout});

        NetworkConfig.getDefault().sync(erdProxy);
        const providers = new Providers(erdProxy, erdApi, options,
            (address: Address, token?: string) => {
                vueErdJsStore.walletAddress = address;
                vueErdJsStore.token = token;
            },
            () => {
                vueErdJsStore.walletAddress = undefined;
                vueErdJsStore.token = undefined;
            },
            (transaction: Transaction) => {
                //TODO : mitt vueErdJsStore.$emit('transaction', transaction);
            });

        const vueErdJs = new VueErdJs(providers, vueErdJsStore, options.explorer.url);

        app.config.globalProperties.$erd = vueErdJs;
        app.mixin({
            beforeCreate() {
                vueErdJs.providers.init();
            },
            beforeMount() {
                vueErdJs.providers.onUrl(window.location);
            }
        })

        for (const component of Components) {
            app.component(component.name, component)
        }
        app.provide('$erd', vueErdJs);
    }
}

export function useErdJs() {
    const erdJs = inject(ErdJsSymbol)
    if (!erdJs) {
        // throw error, no store provided
    }
    return erdJs
}
