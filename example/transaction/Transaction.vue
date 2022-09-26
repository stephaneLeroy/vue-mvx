<template>
  <div>
    <h1>Transaction</h1>
      <div class="account">
          Account balance : {{accountBalance}}
      </div>
      <input v-model="amount" type="number"/>
      <button @click="sendTransaction()">Send</button>
      <button @click="claimxEgld()">Claim xEGLD (faucet)</button>
      <div v-if="sending" class="transaction">
          <div class="transaction-info">
               {{ transactionState }}... <div class="loader" v-if="!transactionResult"></div>
              <a v-if="transactionUrl" :href="transactionUrl" target="_blank">See on explorer</a>
          </div>
          <div class="transaction-result">
              {{transactionResult}}
          </div>
      </div>
  </div>
</template>

<script>
import {TokenPayment} from "@elrondnetwork/erdjs";
import {R3d4Faucet} from "./R3d4Faucet";
import {Account, Transaction, TransactionPayload} from "@elrondnetwork/erdjs";

export default {
    name: 'Transaction',
    data () {
        return {
            error: null,
            amount: 1,
            account: null,
            sending: false,
            transactionState: null,
            transactionResult: null,
            transactionUrl: null
        }
    },
    created() {
        this.$erd.$on('transaction', (transaction) => {
            console.log("transaction", transaction);
            const trans = transaction[0];
            this.transactionState = 'Transaction complete'
            if (trans.status.isSuccessful()) {
                this.transactionResult = 'Transaction success'
            } else {
                this.transactionResult = 'Transaction error'
            }
        })
    },
    async mounted() {
        this.account = new Account(this.$erd.walletAddress);
        const accountOnNetwork = await this.$erd.proxy.getAccount(this.$erd.walletAddress);
        this.account.update(accountOnNetwork)

    },
    computed: {
        accountBalance() {
            if(!this.account) {
                return ''
            }
          console.log("Account", this.account, this.account.balance)
          return TokenPayment.egldFromBigInteger(this.account.balance).toPrettyString();
        }
    },
    methods: {
        async sendTransaction() {
            this.transactionResult = null;
            this.transactionState = null;
            this.transactionUrl = null;
            this.sending = true;

            console.log("Send transaction", this.amount)
            const networkConfig = await this.$erd.proxy.getNetworkConfig();
            const transaction = new Transaction({
                data: new TransactionPayload("vue-erdjs"),
                gasLimit: 70000,
                receiver: this.$erd.walletAddress,
                value: TokenPayment.egldFromAmount(this.amount),
                chainID: networkConfig.ChainID
            });
            transaction.setNonce(this.account.getNonceThenIncrement())

            this.transactionState = 'Waiting for transaction to be signed'
            this.$erd.providers.signAndSend(transaction)
                .then((result) => {
                    this.transactionState = 'Waiting for transaction to be validated'
                    this.transactionUrl = this.$erd.explorerTransactionUrl(result);
                    this.$erd.providers.transactionResult(result)
                }).catch((error) => {
                    this.transactionResult = error
            })
        },
        async claimxEgld() {
            const r3d4Faucet = new R3d4Faucet();
            const response = r3d4Faucet.claimEgld(this.amount.toString(), this.$erd.walletAddress.bech32())
            console.log("Claim transaction", this.$erd.walletAddress, this.amount.toString(), response)
        }
    },
}
</script>
