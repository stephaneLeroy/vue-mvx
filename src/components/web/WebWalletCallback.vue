<template>
    <span></span>
</template>

<script lang="ts" setup>
import {defineEmits, inject, onMounted} from "vue";
import type VueErdJs from "@/VueErdJs";

const emit = defineEmits<{
    (event: 'logged', param: Object): void
}>()

const erdJS = inject<VueErdJs>('$erd');

onMounted(() => {
    if (!erdJS) {
        throw new Error('ErdJs instance not provided');
    }
    erdJS.webWallet.callbackReceived(window.location.search);
    if (erdJS.logged) {
        emit('logged', {address: erdJS.walletAddress, token: erdJS.token})
    }
})

</script>
