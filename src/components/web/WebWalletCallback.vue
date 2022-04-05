<template>
    <span></span>
</template>

<script lang="ts">
import { defineComponent} from "vue";

export default defineComponent({
    name: 'WebWalletCallback',
    emits: ['logged'],
    mounted() {
        this.$erd.webWallet.callbackReceived(window.location.search);
        if (this.$erd.logged) {
            this.$emit('logged', {address: this.$erd.walletAddress, token: this.$erd.token})
        }
    },
})
</script>
