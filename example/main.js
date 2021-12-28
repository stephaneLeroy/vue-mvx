import Vue from 'vue'
import App from './App.vue'
import ElronVue from '../src/index'

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
    heartbeatInterval: 5000
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
