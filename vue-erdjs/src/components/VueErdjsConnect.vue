<template>
    <div class="vue3rdj5">
        <div class="vue3rdj5__logged" v-if="$erdLogin.address">
            <div class="vue3rdj5__logged-address">{{ $erdLogin.obfuscatedAddress() }}</div>
            <button class="vue3rdj5__logged-logout" @click.prevent="logout()">Logout</button>
        </div>
        <div
            class="vue3rdj5__modes"
            v-else>
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

<script lang="ts">
import { defineComponent } from "vue";
import QRCodeDefaultHandler from "./maiar/QRCodeDefaultHandler";
import VueErdjsTab from "@/components/VueErdjsTab.vue";

export default defineComponent({
    components: {
        VueErdjsTab
    },
    props: {
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
    },
    data() {
        return {
            selectedMode: ''
        }
    },
    methods: {
        logout() {
            this.$erd.logout()
            this.selectedMode = '';
        }
    },
    watch: {
        "$erdLogin.address": function(address) {
            if(address != null){
                const searchParams = new URLSearchParams(window.location.search);
                const fromUrl = searchParams.get('fromUrl');
                if (fromUrl) {
                    window.location.href = fromUrl;
                }
            }
        }
    }
});

</script>

<style lang="scss">
@import "../sass/vue3rdj5";
</style>
