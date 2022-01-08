<template>
  <div class="vue3rdj5__mode" >
    <button class="vue3rdj5__mode-open"
            @click.stop="login()">
      <img class="vue3rdj5__mode-logo vue3rdj5__mode-logo-webwallet"
           :src="logo"
           alt="Elrond Wallet Logo">
      Defi Wallet login
    </button>
  </div>
</template>

<script>
import WebWalletLogo from '../../assets/web-wallet-logo.png';
export default {
  name: 'DefiWalletLogin',
  data() {
    return {
      logo: WebWalletLogo
    }
  },
  mounted() {
    console.log(this.logo);
    this.$erd.defiWallet.callbackReceived(window.location.search);
  },
  methods: {
    login() {
      this.$erd.defiWallet.login();
    }
  }
}
</script>
