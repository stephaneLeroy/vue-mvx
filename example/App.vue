<template>
  <div id="app">
    <img alt="Elrond Logo" src="/assets/elrond-logo.png">
    <h1>Elrond ERD Example APP</h1>
    <div v-if="address">
      <div>Logged with address : {{address}}</div>
      <div class="cta">
        <div class="button" @click="sendTransaction()">Test transaction</div>
        <div class="button" @click="logout()">Logout</div>
      </div>
    </div>

    <h2>Maiar App</h2>
      <maiar-login>
        <a href="#">Login with Maiar App</a>
        <template v-slot:qrcode="{ qrcode }">
          <q-r-code class="qrcode" :qrcode="qrcode"></q-r-code>
        </template>
        <template v-slot:deeplink="{ deeplink }">
          <a :href="deeplink">Maiar App DeepLink</a>
        </template>
      </maiar-login>

    <h2>Ledger</h2>
    <ledger-login>
      <a href="#">Show accounts</a>
      <template v-slot:accounts="{accounts, login}">
        <ul>
          <li v-for="(account, index) in accounts"><a @click="login(index)" href="#">{{account}}</a></li>
        </ul>
      </template>
    </ledger-login>
  </div>
</template>

<script>
import LedgerLogin from "../src/components/ledger/LedgerLogin";
import MaiarLogin from "../src/components/maiar/MaiarLogin";
import QRCode from "./QRCode";
import {
  Account,
  Address,
  Balance,
  ContractFunction,
  GasLimit,
  Transaction,
  TransactionPayload
} from "@elrondnetwork/erdjs";


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
    },
    async sendTransaction() {
      console.log("Send transaction", this.$erd.provider, this.$erd.walletAddress);

      let erdAddress = new Address(this.$erd.walletAddress);
      let account = new Account(erdAddress);
      await account.sync(this.$erdProxy);

      const payload = TransactionPayload.contractCall()
        .setFunction(new ContractFunction("ping"))
        .setArgs([])
        .build();

      const transaction = new Transaction({
        sender: erdAddress,
        receiver: new Address("erd1qqqqqqqqqqqqqpgquvt728n40ssd8n2qns9jrlqpwq2jc4rj4cysfuj3ad"),
        gasLimit: new GasLimit(10000000),
        value: Balance.egld(0.01),
        data: payload,
      });
      transaction.setNonce(account.nonce);

      this.$erd.provider.sendTransaction(transaction).then((transaction) => {
        console.log("Transaction sent",transaction);
      });
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

.cta {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}

.cta .button {
  color: cornsilk;
  font-size: large;
  min-width: 150px;
  background-color: #254dc4;
  margin: 2px;
  padding: 5px 10px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
