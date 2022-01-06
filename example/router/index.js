import Vue from 'vue'
import VueRouter from 'vue-router'
import VueErdjs from '../../src'
import Home from '../home/Home.vue'
import Authenticate from '../authenticate/Authenticate.vue'
import Maiar from "../authenticate/Maiar";
import Ledger from "../authenticate/Ledger";
import WebWallet from "../authenticate/WebWallet";
import PingPong from "../pingpong/PingPong";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pingpong',
    name: 'PingPong',
    component: PingPong,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: Authenticate,
    children: [
      {
        path: 'maiar',
        component: Maiar
      },
      {
        path: 'ledger',
        component: Ledger
      },
      {
        path: 'webwallet',
        component: WebWallet
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log("Guard", to)
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next();
  } else if (!VueErdjs.isLogged()) {
    next({
      path: '/authenticate',
      query: { fromUrl: to.fullPath }
    })
  } else {
    next();
  }
})

export default router
