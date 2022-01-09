<template>
  <div>
    <h1>Ping pong smartcontract</h1>
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
            pingAmount: 0
        }
    },
    mounted() {
        this.pingPong = new PingPongSC(this.$erd.currentProvider, this.$erdProxy);
        this.pingPong.pingAmount().then((amount) => {
            console.log("ping amount", amount);
            this.pingAmount = amount;
        });
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
                let transaction = await this.pingPong.ping(this.$erd.walletAddress, this.pingAmount);

                await this.$erd.transactionResult(transaction).then((transaction) => {
                    if (!transaction.status.isSuccessful()) {
                        throw new Error(`Transaction failed : ${transaction.getSmartContractResults().getImmediate().getReturnMessage()}`)
                    }
                })
            } catch (error) {
                this.goRight = false;
                this.error = error.message;
            }
        },
        pong() {
          this.goRight = false;
          this.goLeft = true;
        }
    },
}
</script>
