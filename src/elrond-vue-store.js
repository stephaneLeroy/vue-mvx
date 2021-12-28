import Vue from 'vue';

class ElrondVueStore {
  constructor () {
    this.state = new Vue({ data: {
        providers :  null,
        walletAddress : null,
        explorerUrl: null
      } });
  }

  get logged () {
    return this.state.$data.walletAddress != null
  }

  get walletAddress () {
    return this.state.$data.walletAddress;
  }

  get maiarApp () {
    return this.state.$data.providers.maiarApp;
  }

  get ledger() {
    return this.state.$data.providers.ledger;
  }

  get provider() {
    return this.state.$data.providers;
  }

  logout() {
    this.state.$data.providers.logout();
  }

  explorerTransactionUrl(transaction){
    return `${this.state.$data.explorerUrl}/transactions/${transaction.hash}`;
  }

}

export default ElrondVueStore;
