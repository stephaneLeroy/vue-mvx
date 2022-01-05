<template>
  <div @click.stop="login()">
    <slot><a href="#">Web Wallet login</a></slot>
  </div>
</template>

<script>
export default {
  name: 'WebWalletLogin',
  mounted() {
    this.$erd.webWallet.callbackReceived(window.location.search);
  },
  methods: {
    login() {
      this.$erd.webWallet.login();
    }
  }
}
</script>
