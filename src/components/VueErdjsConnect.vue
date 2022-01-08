<template>
    <div class="vue3rdj5">
      <div class="vue3rdj5__logged" v-if="$erd.walletAddress">
        <div class="vue3rdj5__logged-address">{{$erd.obfuscatedWalletAddress}}</div>
        <button class="vue3rdj5__logged-logout" @click.prevent="$erd.logout()">Logout</button>
      </div>
      <div v-if="!$erd.walletAddress">
        <defi-wallet-login></defi-wallet-login>
        <maiar-login></maiar-login>
        <ledger-login></ledger-login>
        <web-wallet-login></web-wallet-login>
      </div>
    </div>
</template>

<script>
export default {
  name:"VueErdjsConnect",
  mounted() {
    this.redirect();
  },
  methods: {
    redirect() {
      if (this.$router && this.$erd.walletAddress && this.$route.query.fromUrl) {
        this.$router.push(this.$route.query.fromUrl);
      }
    }
  },
  watch: {
    "$erd.walletAddress": (address) => {
      if(address != null && this){
        this.redirect();
      }
    }
  }
}
</script>

<style lang="scss">
    @import "../sass/vue3rdj5";
</style>
