<template>
  <span></span>
</template>

<script>
export default {
  name: 'WebWalletCallback',
  mounted() {
    this.$erd.webWallet.callbackReceived(window.location.search);
  },
}
</script>
