<template>
  <div>
    <div @click="fetchAccounts()">
      <slot></slot>
    </div>
    <div v-if="error" :error="error">
      <slot name="error">{{error}}</slot>
    </div>
    <slot name="accounts" :accounts="accounts" :login="login"></slot>
  </div>
</template>

<script>
export default {
  name: 'LedgerLogin',
  data () {
    return {
      startIndex: 0,
      accounts: [],
      error: null
    }
  },
  methods: {
    async fetchAccounts() {
      this.error = null;
      this.accounts = [];
      this.accounts = await this.$erd.ledger.accounts(this.startIndex, 5).catch((error) => {
        this.error = error;
      });
    },
    login(index) {
      this.$erd.ledger.login(index)
    }
  }
}
</script>
