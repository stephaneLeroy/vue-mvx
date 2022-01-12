import _Vue from "vue";
import VueErdJsStore from './VueErdJsStore';
import Providers from "./providers/Providers";
import {Address, NetworkConfig, ApiProvider, ProxyProvider} from "@elrondnetwork/erdjs";
import Components from "./components";
import {ProviderOption} from "./providers/config";
import VueErdJs from "./VueErdJs";

const vueErdJsStore = new VueErdJsStore();
export { vueErdJsStore }
export default function VueErdJsPlugin(Vue: typeof _Vue, options?: ProviderOption) {
    if(!options) {
        options = new ProviderOption();
    }
    const erdApi = new ApiProvider(options.api.url, {timeout: options.api.timeout});
    const erdProxy = new ProxyProvider(options.proxy.url, {timeout: options.proxy.timeout});

    NetworkConfig.getDefault().sync(erdProxy);
    const providers = new Providers(erdProxy, erdApi, options,
        (address: Address, token?: string) => {
            vueErdJsStore.state.$data.walletAddress = address;
            if (token) {
                vueErdJsStore.state.$data.token = token;
            }
        },
        () => {
            vueErdJsStore.state.$data.walletAddress = null;
            vueErdJsStore.state.$data.token = null;
        });

    const vueErdJs = new VueErdJs(providers, vueErdJsStore, options.explorer.url);

    Vue.prototype.$erd = vueErdJs;
    Vue.prototype.$erdProxy = erdProxy;
    Vue.prototype.$erdApi = erdApi;
    Vue.mixin({
        mounted() {
            vueErdJs.providers.init();
        }
    })

    for (const component of Components) {
        Vue.component(component.name, component)
    }
}
