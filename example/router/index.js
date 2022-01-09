import Vue from 'vue'
import VueRouter from 'vue-router'
import VueErdjs from '../../src'
import Home from '../home/Home.vue'
import VueErdjsConnect from "../../src/components/VueErdjsConnect";
import PingPong from "../pingpong/PingPong";
import CustomQRCodeHandler from "./CustomQRCodeHandler";

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
        name: 'VueErdjsConnect',
        component: VueErdjsConnect,
        props: { qrcodeHandler: new CustomQRCodeHandler()}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.requiresAuth)) {
        next();
    } else if (!VueErdjs.isLogged()) {
        next({
            path: '/authenticate',
            query: {fromUrl: to.fullPath}
        })
    } else {
        next();
    }
})

export default router
