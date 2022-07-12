<template>
    <vue-erdjs-tab
        name="Web Wallet"
        @select-mode="login($event)"></vue-erdjs-tab>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, inject} from "vue";
import VueErdjsTab from './../VueErdjsTab.vue';
import type VueErdJs from "@/VueErdJs";

const props = defineProps({
    token: {
        require: false,
        type: String
    }
})

const emit = defineEmits<{
    (event: 'select-mode', mode: String): void
}>()

const erdJS = inject<VueErdJs>('$erd');

function login(name: String) {
    emit('select-mode', name);
    const options = props.token ? {token: props.token} : {};
    if (erdJS) {
        erdJS.webWallet.login(options);
    }
}
</script>
