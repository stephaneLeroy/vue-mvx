<template>
    <span></span>
</template>

<script>
export default {
    name: 'WebWalletCallback',
    mounted() {
        this.$erd.webWallet.callbackReceived(window.location.search);
        if (this.$erd.logged) {
            this.$emit('logged', {address: this.$erd.walletAddress, token: this.$erd.token})
        }
    },
}
</script>
