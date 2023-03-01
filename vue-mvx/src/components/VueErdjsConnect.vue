<template>
    <div class="vue3rdj5">
        <div class="vue3rdj5__logged" v-if="account.address">
            <div class="vue3rdj5__logged-address">{{ account.obfuscatedAddress() }}</div>
            <button class="vue3rdj5__logged-logout" @click.prevent="logout()">Logout</button>
        </div>
        <div
            class="vue3rdj5__modes"
            v-else>
            <vue-erdjs-tab
                name="Defi Wallet"
                @select-mode="selectMode($event as string)"
                :active="tabs.activeTab ==='Defi Wallet'">
                <defi-wallet-login :token="token"></defi-wallet-login>
            </vue-erdjs-tab>
            <vue-erdjs-tab
                name="xPortal"
                @select-mode="selectMode($event as string)"
                :active="tabs.activeTab ==='xPortal'">
                <x-portal-login :qrcodeHandler="qrcodeHandler" :token="token"></x-portal-login>
            </vue-erdjs-tab>
            <vue-erdjs-tab
                name="Ledger"
                @select-mode="selectMode($event as string)"
                :active="tabs.activeTab ==='Ledger'">
                <ledger-login :token="token"></ledger-login>
            </vue-erdjs-tab>

            <web-wallet-login :token="token"></web-wallet-login>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {reactive, watch} from "vue";
import QRCodeDefaultHandler from "./xportal/QRCodeDefaultHandler";
import {useVueErd} from "@/composable/useVueErd";
import XPortalLogin from "@/components/xportal/XPortalLogin.vue";

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
const { erd, account } = useVueErd();

const tabs = reactive({ activeTab: '' });

async function selectMode(mode: string) {
    console.log('selectMode', mode)
    tabs.activeTab = mode;
}
const logout = () =>  {
    erd.logout()
    tabs.activeTab = '';
}

watch(() => account.address, (address) => {
    if(address != null){
        const searchParams = new URLSearchParams(window.location.search);
        const fromUrl = searchParams.get('fromUrl');
        if (fromUrl) {
            window.location.href = fromUrl;
        }
    }
});
</script>

<style lang="scss">
@import "../sass/vue3rdj5";
</style>
