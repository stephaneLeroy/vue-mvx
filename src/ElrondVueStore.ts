import Vue from 'vue';
import {Transaction} from "@elrondnetwork/erdjs";

class ElrondVueStore {
  state: Vue;

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

  get obfuscatedWalletAddress () {
    if(!this.walletAddress || this.walletAddress.isEmpty()) {
      return undefined;
    }
    const keepNbChar = 6;
    return this.walletAddress.bech32().slice(0,keepNbChar) +
      '...' +
      this.walletAddress.bech32().slice(-keepNbChar);
  }

  get maiarApp () {
    return this.state.$data.providers.maiarApp;
  }

  get ledger() {
    return this.state.$data.providers.ledger;
  }

  get webWallet() {
    return this.state.$data.providers.webWallet;
  }

  get defiWallet() {
    return this.state.$data.providers.defiWallet;
  }

  get provider() {
    return this.state.$data.providers;
  }

  logout() {
    this.state.$data.providers.logout();
  }

  explorerTransactionUrl(transaction: Transaction){
    return `${this.state.$data.explorerUrl}/transactions/${transaction.getHash()}`;
  }

}

export default ElrondVueStore;
