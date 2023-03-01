import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {ElrondEnvEnum, providersOptions, initVueErdJsPlugin} from "vue-mvx";

const app = createApp(App)

initVueErdJsPlugin(providersOptions(ElrondEnvEnum.TESTNET, 'b2cf59cbb54d0705fea77630c718af48'))
    .then((vueErdJsPlugin) => {
    app.use(vueErdJsPlugin)
    app.use(router)
    app.mount('#app')
});
