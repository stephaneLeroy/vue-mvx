# Welcome to Vue ErdJS documentation

Vue ErdJS is a **Vue plugin** that provide components and tools to use **Elrond Javascript SDK**

## Getting started

Install required dependencies.
Erd js is not provided by default and qrcode is for the default qrcode handler.
```
npm install vue-erdjs @elrondnetwork/erdjs qrcode
```

Add plugin to your Vue application (default configuration is on devnet)
```
import VueErdJsPlugin from 'vue-erdjs'

Vue.use(VueErdJsPlugin)
```

Then you can simply add the vue-erdjs-connect component to your login page :
```
<template>
    <div>
       <vue-erdjs-connect></vue-erdjs-connect>
    </div>
</template>

<script>

export default {
    name: 'Login'
}
</script>
```
You now have a Login page with all Elrond available wallet connexion types.

## Using vue-router

You can add **vue-erdjs-connect** directly into vue-router configuration.
```
import VueRouter from 'vue-router'
import VueErdjsConnect from "vue-erdjs";

Vue.use(VueRouter)
const routes = [
    {
        path: '/authenticate',
        name: 'VueErdjsConnect',
        component: VueErdjsConnect
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
...
```

You can check if a user is logged before enter a route.

```
...
import { vueErdJsStore, VueErdjsConnect } from 'vue-erdjs'

Vue.use(VueRouter);

const routes = [
    {
        path: '/protected',
        name: 'Protected',
        component: Protected,
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
```

## Components tooling

This plugin add a **$erd** global property for all component.

With it you have access to :
* erd proxy : this.$erd.proxy (a configured ProxyProvider instance from erdjs)
* erd api : this.$erd.api (a configured ApiProvider instance from erdjs)
* providers : this.$providers - It manages all connexion provider and store the current strategy used (the way the user was logged)
  * **this.$erd.providers.sendAndWatch(transaction: Transaction) :** Allow to sign, send and watch a transaction. It return a promise with the TransactionOnNetwork result fetch from Elrond Api.
  * **his.$erd.providers.signAndSend(transaction) :** Allow to sign and send a transaction. It returns a promises with the signed transaction as result.
  * **his.$erd.providers.transactionResult(transaction: Transaction)** : Watch transaction result with Elrond API and return the TransactionOnNetwork fetched.
* all connexion providers : (if needed)

You can watch stored properties :
* $erd.walletAddress : The connected wallet address (null if not connected)
* $erd.logged : true if a wallet is connected
* $erd.token : The sign token used when login

you can listen to events :
* $on('transaction', (transaction) => { //Do something }) : Emit a TransactionOnNetwork event after a watch. This event is emitted with transactionResult and sendAndWatch methods from providers.

## Customize options

If you don't provide options, the DEVNET options are applied.

You have 2 way to configure the plugin.
* Use the providersOptions function with it's enums (example : )
  * ElrondEnvEnum.DEVNET
  * ElrondEnvEnum.TESTNET
  * ElrondEnvEnum.MAINNET

```
import VueErdJsPlugin, {ElrondEnvEnum, providersOptions} from 'vue-erdjs'

Vue.use(VueErdJsPlugin, providersOptions(ElrondEnvEnum.DEVNET));
```

* Provide all parameters :

```
{
    "api": {
        "url": "https://devnet-api.elrond.com",
        "timeout": 2000
    },
    "proxy": {
        "url": "https://devnet-gateway.elrond.com",
        "timeout": 2000
    },
    "explorer": {
        "url": "https://devnet-explorer.elrond.com"
    },
    "maiar": {
        "walletConnectBridgeUrl": "https://bridge.walletconnect.org",
        "walletConnectDeepLink": "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/",
        "heartbeatInterval": 5000,
        "heartbeatEnabled": false,
        "connexionTimeout": 30000
    },
    "webWallet": {
        "url": "https://devnet-wallet.elrond.com"
    }
}
```

## Customize styling

TODO

## Provide a Custom QrCode Handler

You can provide a custom QrCode Handler to avoid the default qrcode one.

You just have to implement a [**IQRCodeHandler**](https://github.com/stephaneLeroy/vue-erdjs/blob/master/src/components/maiar/IQRCodeHandler.ts) class and pass it to **vue-erdjs-connect** in property **qrcodeHandler**

See [CustomQRCodeHandler.ts](https://github.com/stephaneLeroy/vue-erdjs/blob/master/example/router/CustomQRCodeHandler.ts) for an example.

