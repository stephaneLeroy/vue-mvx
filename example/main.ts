import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import VueErdJsPlugin, {ElrondEnvEnum, providersOptions} from '../src'

const app = createApp(App);
app.use(VueErdJsPlugin, providersOptions(ElrondEnvEnum.DEVNET));
app.use(router);
app.mount('#app');
