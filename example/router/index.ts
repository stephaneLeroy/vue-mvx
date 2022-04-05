import { createRouter, createWebHistory } from 'vue-router'
import Home from '../home/Home.vue'
import PingPong from "../pingpong/PingPong.vue";
import CustomQRCodeHandler from "./CustomQRCodeHandler";
import {vueErdJsStore, VueErdjsConnect} from '../../src'

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
        name: 'VueErdjsConnect',
        component: VueErdjsConnect,
        props: { qrcodeHandler: new CustomQRCodeHandler(), token:"hello"}
    }
]

const router = createRouter({
    history: createWebHistory('/vue-erdjs/'),
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
