<template>
    <vue-erdjs-tab
        name="Web Wallet"
        @select-mode="login($event)"></vue-erdjs-tab>
</template>

<script>
import VueErdjsTab from './../VueErdjsTab.vue';
export default {
    name: 'WebWalletLogin',
    components: {
        VueErdjsTab
    },
    mounted() {
        this.$erd.webWallet.callbackReceived(window.location.search);
    },
    methods: {
        login (name) {
            this.$emit('select-mode', name);
            this.$erd.webWallet.login();
        }
    }
}
</script>
