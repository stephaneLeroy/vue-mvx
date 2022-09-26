import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../home/Home.vue'
import Transaction from "../transaction/Transaction";
import CustomQRCodeHandler from "./CustomQRCodeHandler";
import {vueErdJsStore, VueErdjsConnect} from '../../src'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/transaction',
        name: 'Transaction',
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

const router = new VueRouter({
    mode: 'history',
    base: '/vue-erdjs/',
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.requiresAuth)) {
        next();
    } else if (!vueErdJsStore.logged) {
        next({
            path: '/authenticate',
            query: {fromUrl: to.fullPath}
        })
    } else {
        next();
    }
})

export default router
