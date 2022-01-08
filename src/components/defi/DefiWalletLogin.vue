<template>
    <vue-erdjs-tab
        name="Defi Wallet"
        @select-mode="login($event)"></vue-erdjs-tab>
</template>

<script>
import VueErdjsTab from './../VueErdjsTab.vue';
export default {
    name: 'DefiWalletLogin',
    components: {
        VueErdjsTab
    },
    methods: {
        login (name) {
            this.$emit('select-mode', name);
            this.$erd.defiWallet.login();
        }
    }
}
</script>
