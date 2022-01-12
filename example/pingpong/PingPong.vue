<template>
  <div>
    <h1>Ping pong smartcontract ({{ pingEgldPrice }})</h1>
      <div class="pingpong__error">{{error ? error : ' '}}</div>
      <div class="pingpong">
          <div class="pingpong__left" :class="{ 'pingpong__left--animated': goLeft || goRight}"/>
          <button :class="{ 'pingpong__ball--goright': goRight, 'pingpong__ball--goleft': goLeft}" class="pingpong__ball" @click.prevent="ping()">
              {{goRight ? 'Pong!' : 'Ping!'}}
          </button>
          <div class="pingpong__right" :class="{ 'pingpong__right--animated': goLeft || goRight}"/>
          <div class="pingpong__clear"></div>
      </div>
  </div>
</template>

<script>
import PingPongSC from './PingPongSC'
import {Balance} from "@elrondnetwork/erdjs";

export default {
    name: 'PingPong',
    data () {
        return {
            qrcode: null,
            deepLink: null,
            goRight: false,
            goLeft: false,
            error: null,
            pingPong: null,
            pingAmount: 0,
            hasPing: false
        }
    },
    created() {
        this.$erd.$on('transaction', (transaction) => {
            console.log("transaction", transaction);
            const trans = transaction[0];
            if (!trans.status.isSuccessful()) {
                this.error = `Transaction failed : ${trans.getSmartContractResults().getImmediate().getReturnMessage()}`;
            }
        })
    },
    mounted() {
        this.pingPong = new PingPongSC(this.$erd.providers, this.$erdProxy);
        this.pingPong.pingAmount().then((amount) => {
            this.pingAmount = amount;
        });
        this.pingPong.didUserPing(this.$erd.walletAddress).then((hasPing) => {
            this.hasPing = hasPing;
        })
    },
    computed: {
      pingEgldPrice() {
          if(this.pingAmount) {
              let amount = Balance.egld(this.pingAmount.valueOf());
              let denominated = amount.valueOf().shiftedBy(-amount.token.decimals).toFixed(2);
              return `${denominated} ${amount.token.getTokenIdentifier()}`;
          }
          return '- EGLD';
      }
    },
    methods: {
        logout() {
            this.$erd.logout();
        },
        async ping() {
            this.goLeft = false;
            this.goRight = true;
            this.pingPong.dateToPong(this.$erd.walletAddress);

            try {
                 await this.pingPong.ping(this.$erd.walletAddress, this.pingAmount);
            } catch (error) {
                this.goRight = false;
            }
        },
        pong() {
          this.goRight = false;
          this.goLeft = true;
        }
    },
}
</script>
