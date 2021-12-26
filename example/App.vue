<template>
  <div id="app">
    <img alt="Elrond Logo" src="/assets/elrond-logo.png">
    <h1>Elrond ERD Example APP</h1>
    <div v-if="address">Logged with address : {{address}} <span @click="logout()">Logout</span></div>

    <h2>Maiar App</h2>
      <maiar-login>
        <a href="#">Login with Maiar App</a>
        <template v-slot:qrcode="slot">
          <q-r-code class="qrcode" :qrcode="slot.qrcode"></q-r-code>
        </template>
        <template v-slot:deeplink="slot">
          <a :href="slot.deeplink">Maiar App DeepLink</a>
        </template>
      </maiar-login>

    <h2>Ledger</h2>
    <ledger-login>
      <a href="#">Show accounts</a>
      <template v-slot:accounts="accounts">
        <ul>
          <li v-for="(account, index) in accounts"><a @click="$erd.ledger.login(index)" href="#">{{account}}</a></li>
        </ul>
      </template>
    </ledger-login>
  </div>
</template>

<script>
import LedgerLogin from "../src/components/ledger/LedgerLogin";
import MaiarLogin from "../src/components/maiar/MaiarLogin";
import QRCode from "./QRCode";


export default {
  name: 'app',
  components: {QRCode, MaiarLogin, LedgerLogin},
  data () {
    return {
      address: null,
      maiar: {
        qrcode: null,
        deepLink: null
      }
    }
  },
  methods: {
    logout() {
      this.$erd.logout();
    }
  },
  watch: {
    "$erd.walletAddress": function (address) {
      this.address = address;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

.qrcode {
  height: 300px;
  max-width: 500px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode svg {
  width: 300px;
  height: 300px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
