import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import VueErdJsPlugin, {ElrondEnvEnum, providersOptions} from '../src'

Vue.use(VueErdJsPlugin, providersOptions(ElrondEnvEnum.DEVNET));

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
