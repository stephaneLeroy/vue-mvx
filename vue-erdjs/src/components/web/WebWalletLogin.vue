<template>
    <vue-erdjs-tab
        name="Web Wallet"
        @select-mode="login($event)"></vue-erdjs-tab>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";
import VueErdjsTab from './../VueErdjsTab.vue';
import {useVueErd} from "@/composable/useVueErd";

const props = defineProps({
    token: {
        require: false,
        type: String
    }
})

const emit = defineEmits<{
    (event: 'select-mode', mode: String): void
}>()

const { erd } = useVueErd();

function login(name: String) {
    emit('select-mode', name);
    const options = props.token ? {token: props.token} : {};
    if (erd) {
        erd.webWallet.login(options);
    }
}
</script>
