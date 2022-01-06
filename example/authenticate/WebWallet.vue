<template>
  <div>
    <h2>Web Wallet</h2>
    <web-wallet-login></web-wallet-login>
    <web-wallet-callback></web-wallet-callback>
  </div>
</template>

<script>
export default {
  name: 'WebWallet',
  data () {
    return {
      qrcode: null,
      deepLink: null
    }
  },
}
</script>
