<template>
    <span></span>
</template>

<script lang="ts" setup>
import {defineEmits, inject, onMounted} from "vue";
import type {IVueErdJsLogin} from "@/VueErdJsLogin";
import type VueErdJs from "@/VueErdJs";

const emit = defineEmits<{
    (event: 'logged', param: Object): void
}>()

const erdJS = inject<VueErdJs>('$erdLogin');
const erdJSLogin = inject<IVueErdJsLogin>('$erdLogin');

onMounted(() => {
    if (!erdJSLogin || !erdJS) {
        throw new Error('ErdJs instance not provided');
    }
    erdJS.webWallet.callbackReceived(window.location.search);
    if (erdJSLogin.logged()) {
        emit('logged', {address: erdJSLogin.address, token: erdJSLogin.token})
    }
})

</script>
