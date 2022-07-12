import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {VueErdjsConnect} from "vue-erdjs";
import CustomQRCodeHandler from "./CustomQRCodeHandler";
import 'vue-erdjs/dist/index.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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

// router.beforeEach((to, from, next) => {
//     if (!to.matched.some(record => record.meta.requiresAuth)) {
//         next();
//     } else if (!vueErdJsStore.logged) {
//         next({
//             path: '/authenticate',
//             query: {fromUrl: to.fullPath}
//         })
//     } else {
//         next();
//     }
// })

export default router
