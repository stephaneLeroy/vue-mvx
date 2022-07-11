<template>
    <div class="vue3rdj5">
        <div class="vue3rdj5__logged" v-if="$erd.walletAddress">
            <div class="vue3rdj5__logged-address">{{ $erd.obfuscatedWalletAddress }}</div>
            <button class="vue3rdj5__logged-logout" @click.prevent="$erd.logout()">Logout</button>
        </div>
        <div
            class="vue3rdj5__modes"
            v-if="!$erd.walletAddress">
            <vue-erdjs-tab
                name="Defi Wallet"
                @select-mode="selectedMode = $event as string"
                :selected-mode="selectedMode"></vue-erdjs-tab>
            <defi-wallet-login
                :selected-mode="selectedMode"
                :token="token"></defi-wallet-login>
            <vue-erdjs-tab
                name="Maiar"
                @select-mode="selectedMode = $event as string"
                :selected-mode="selectedMode"></vue-erdjs-tab>
            <maiar-login
                :selected-mode="selectedMode"
                :qrcodeHandler="qrcodeHandler"
                :token="token"></maiar-login>
            <vue-erdjs-tab
                name="Ledger"
                @select-mode="selectedMode = $event as string"
                :selected-mode="selectedMode"></vue-erdjs-tab>
            <ledger-login
                :selected-mode="selectedMode"
                :token="token"></ledger-login>
            <web-wallet-login
                @select-mode="selectedMode = $event as string"
                :selected-mode="selectedMode"
                :token="token"></web-wallet-login>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {defineProps, inject, watchEffect} from "vue";

import VueErdjsTab from './VueErdjsTab.vue';
import QRCodeDefaultHandler from "./maiar/QRCodeDefaultHandler";
import {ref} from "@vue/reactivity";
import type VueErdJs from "@/VueErdJs";

const props = defineProps({
    qrcodeHandler: {
        require: true,
        default: function () {
            return new QRCodeDefaultHandler()
        }
    },
    token: {
        require: false,
        type: String
    }
})

const selectedMode = ref('');

const erdJS = inject<VueErdJs>('$erd');

function redirect() {
    const searchParams = new URLSearchParams(window.location.search);
    const fromUrl = searchParams.get('fromUrl');
    if (fromUrl) {
        window.location.href = fromUrl;
    }
}

watchEffect(() => {
    if (erdJS && erdJS.walletAddress) {
        redirect();
    }
})
</script>

<style lang="scss">
@import "../sass/vue3rdj5";
</style>
