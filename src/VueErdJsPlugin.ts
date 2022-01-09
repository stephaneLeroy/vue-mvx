import ElrondVueStore from './ElrondVueStore';
import Providers from "./provider/Providers";
import { Address, NetworkConfig, ApiProvider, ProxyProvider } from "@elrondnetwork/erdjs";
import Components from "./components";
import {ProviderOption} from "./provider/config";

const store = new ElrondVueStore();
let erdProxy: ProxyProvider, erdApi: ApiProvider;

export default {
    isLogged() {
        return store.walletAddress != null;
    },
    erdProxy() {
        return erdProxy;
    },
    erdApi() {
        return erdApi;
    },

    install(Vue: any, options: ProviderOption) {
        erdApi = new ApiProvider(options.api.url, {timeout: options.api.timeout});
        erdProxy = new ProxyProvider(options.proxy.url, {timeout: options.proxy.timeout});

        NetworkConfig.getDefault().sync(erdProxy);
        store.state.$data.providers = new Providers(erdProxy, erdApi, options,
            (address: Address) => {
                store.state.$data.walletAddress = address;
            },
            () => {
                store.state.$data.walletAddress = null;
            });
        store.state.$data.explorerUrl = options.explorer.url;

        Vue.mixin({
            beforeCreate() {
                this.$erd = store;
                this.$erdProxy = erdProxy;
                this.$erdApi = erdApi;
            },
            mounted() {
                this.$erd.providers.init();
            }
        })

        for (const component of Components) {
            Vue.component(component.name, component)
        }
    }
}
