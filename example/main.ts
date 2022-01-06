import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import ElronVue from '../src'

Vue.use(ElronVue, {
  api: {
    url: "https://devnet-api.elrond.com",
    timeout: 2000
  },
  proxy: {
    url: "https://devnet-gateway.elrond.com",
    timeout: 2000
  },
  explorer: {
    url: "https://devnet-explorer.elrond.com",
  },
  maiar: {
    walletConnectBridgeUrl: "https://bridge.walletconnect.org",
    walletConnectDeepLink: "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/",
    heartbeatInterval: 5000,
    heartbeatEnabled: false
  },
  webWallet: {
    url:"https://devnet-wallet.elrond.com"
  }
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
