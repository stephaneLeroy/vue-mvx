import { createRouter, createWebHistory } from 'vue-router'
import Transaction from '../views/Transaction.vue'
import {VueErdjsConnect} from "vue-mvx";
import CustomQRCodeHandler from "./CustomQRCodeHandler";
import 'vue-mvx/dist/index.css'
import type {App} from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'transaction',
      component: Transaction,
        meta: {
            requiresAuth: true
        }
    },
      {
          path: '/authenticate',
          name: 'VueErdjsConnect',
          component: VueErdjsConnect,
          props: { qrcodeHandler: new CustomQRCodeHandler(), token:"hello"}
      }
  ]
})

export default {
    install(app: App) {
        router.install(app)
        router.beforeEach(async ( to, from, next) => {
            if (!to.matched.some(record => record.meta.requiresAuth)) {
                next();
            } else if (!app.config.globalProperties.$erdAccount.logged()) {
                console.log("router logged", app.config.globalProperties.$erdAccount.logged());
                next({
                    path: '/authenticate',
                    query: {fromUrl: to.fullPath}
                })
            } else {
                next();
            }
        })
    }
}
