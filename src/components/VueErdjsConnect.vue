<template>
    <div class="vue3rdj5">
        <div class="vue3rdj5__logged" v-if="$erd.walletAddress">
            <div class="vue3rdj5__logged-address">{{$erd.obfuscatedWalletAddress}}</div>
            <button class="vue3rdj5__logged-logout" @click.prevent="$erd.logout()">Logout</button>
        </div>
        <div
            class="vue3rdj5__modes"
            v-if="!$erd.walletAddress">
            <vue-erdjs-tab
                name="Defi Wallet"
                @select-mode="selectedMode = $event"
                :selected-mode="selectedMode"></vue-erdjs-tab>
            <defi-wallet-login
                :selected-mode="selectedMode"
                :token="token"></defi-wallet-login>
            <vue-erdjs-tab
                name="Maiar"
                @select-mode="selectedMode = $event"
                :selected-mode="selectedMode"></vue-erdjs-tab>
            <maiar-login
                :selected-mode="selectedMode"
                :qrcodeHandler="qrcodeHandler"
                :token="token"></maiar-login>
            <vue-erdjs-tab
                name="Ledger"
                @select-mode="selectedMode = $event"
                :selected-mode="selectedMode"></vue-erdjs-tab>
            <ledger-login
                :selected-mode="selectedMode"
                :token="token"></ledger-login>
            <web-wallet-login
                @select-mode="selectedMode = $event"
                :selected-mode="selectedMode"
                :token="token"></web-wallet-login>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import VueErdjsTab from './VueErdjsTab.vue';
import QRCodeDefaultHandler from "./maiar/QRCodeDefaultHandler";

export default defineComponent({
    components: { VueErdjsTab },
    name:"VueErdjsConnect",
    props: {
        qrcodeHandler: {
            require: true,
            default: function() { return new QRCodeDefaultHandler() }
        },
        token: {
            require: false,
            type: String
        }
    },
    data () {
        return {
            selectedMode: ''
        }
    },
    methods: {
        redirect: async function() {
            if (this.$router && this.$erd.walletAddress && this.$route.query.fromUrl) {
                await this.$router.push(this.$route.params['fromUrl'].toString());
            }
        }
    },
    watch: {
    '$erd.walletAddress'(address) {
            if(address != null){
                this.redirect();
            }
        }
    }
})
</script>

<style lang="scss">
    @import "../sass/vue3rdj5";
</style>
