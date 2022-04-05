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

<script lang="ts">
import { defineComponent} from "vue";
import PingPongSC from './PingPongSC'
import {Balance} from "@elrondnetwork/erdjs";
import {BigNumber} from "bignumber.js";

export default defineComponent({
    name: 'PingPong',
    data () {
        return {
            qrcode: null,
            deepLink: null,
            goRight: false,
            goLeft: false,
            error: '',
            pingPong: new PingPongSC(this.$erd.providers),
            pingAmount: new BigNumber(0),
            hasPing: false
        }
    },
    created() {
        // TODO this.$erd.$on('transaction', (transaction) => {
        //     console.log("transaction", transaction);
        //     const trans = transaction[0];
        //     if (!trans.status.isSuccessful()) {
        //         this.error = `Transaction failed : ${trans.getSmartContractResults().getImmediate().getReturnMessage()}`;
        //     }
        // })
    },
    mounted() {
        if(!this.$erd.walletAddress) {
            return;
        }
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
        async ping() {
            if(!this.$erd.walletAddress || !this.pingAmount) {
                return;
            }
            this.goLeft = false;
            this.goRight = true;
            this.pingPong.dateToPong(this.$erd.walletAddress);

            try {
                 await this.pingPong.ping(this.$erd.walletAddress, new BigNumber(0));
            } catch (error) {
                this.goRight = false;
            }
        },
        pong() {
          this.goRight = false;
          this.goLeft = true;
        }
    },
})
</script>
