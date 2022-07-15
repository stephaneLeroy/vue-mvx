import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {ElrondEnvEnum, providersOptions, VueErdJsPlugin} from "vue-erdjs";

const app = createApp(App)

app.use(router)
app.use(VueErdJsPlugin, providersOptions(ElrondEnvEnum.TESTNET))

app.mount('#app')
