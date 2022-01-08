<template>
    <h1>PingPong</h1>
</template>

<script>
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
    name: 'PingPong',
    data () {
        return {
            qrcode: null,
            deepLink: null
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
}
</script>
