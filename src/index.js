console.log('loading vue-erd');
import ElrondVueStore from './elrond-vue-store';
import ProviderStrategy from "./provider/provider-strategy";
import {NetworkConfig, ApiProvider, ProxyProvider} from "@elrondnetwork/erdjs/out";
import Components from "./components";

const store = new ElrondVueStore();
let erdProxy;
let erdApi;

export default {
  isLogged() {
    return store.state.walletAddress != null;
  },
  erdProxy() {
    return erdProxy;
  },
  erdApi() {
    return erdApi;
  },

  install(Vue, options) {
    console.log(options);

    erdApi = new ApiProvider(options.api.url, { timeout: options.api.timeout });
    erdProxy = new ProxyProvider(options.proxy.url, { timeout: options.proxy.timeout });

    NetworkConfig.getDefault().sync(erdProxy);
    store.state.$data.providers = new ProviderStrategy(erdProxy, options,
      (address) => {
         store.state.$data.walletAddress = address;
      },
      () => {
        store.state.$data.walletAddress = null;
      });
    store.state.$data.explorerUrl = options.explorer.url;

    Vue.mixin({
      beforeCreate () {
        this.$erd = store;
        this.$erdProxy = erdProxy;
        this.$erdApi = erdApi;
      }
    })

    for (const component of Components) {
      Vue.component(component.name, component)
    }
  }
}
