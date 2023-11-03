<template>
    <div>
        <h1>Transaction</h1>
        <div class="account">
            Account balance : {{accountBalance}}
        </div>
        <input v-model="amount" type="number"/>
        <button @click="sendTransaction()">Send</button>
        <VueErdjs2FA />
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

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import { useVueErd, VueErdjs2FA} from "vue-mvx";
import {TokenPayment, Transaction, TransactionPayload} from "@multiversx/sdk-core";
import type {Account, ITransactionOnNetwork} from "@multiversx/sdk-core";
import useXportalHub from "@/hub/XPortalHubSimulator";

const amount = ref(0.1);
const account = ref<Account>();
const sending = ref(false);
const transactionState = ref();
const transactionResult = ref();
const transactionUrl = ref();
/*window.addEventListener('message', (e) => {
    console.log("xportal message", e)
});*/
const { erd, fetchAccount } = useVueErd();
onMounted(async () => {
    await useXportalHub();
    erd.on('transaction', (transaction: ITransactionOnNetwork) => {
        console.log("transaction", transaction);
        transactionState.value = 'Transaction complete'
        if (transaction.status.isExecuted()) {
            transactionResult.value = 'Transaction success'
        } else {
            transactionResult.value = 'Transaction error'
        }
    })
    account.value = await fetchAccount()
})

const accountBalance = computed(() => {
    if(!account.value) {
        return ''
    }
    console.log("Account", account.value, account.value.balance)
    return TokenPayment.egldFromBigInteger(account.value.balance.toString()).toPrettyString();
})

async function sendTransaction() {
    account.value = await fetchAccount();
    transactionResult.value = null;
    transactionState.value = null;
    transactionUrl.value = null;
    sending.value = true;
    console.log("Send transaction", amount.value)

    const networkConfig = await erd.proxy.getNetworkConfig();
    const transaction = new Transaction({
        data: new TransactionPayload("vue-erdjs"),
        gasLimit: 10000000,
        receiver: account.value!.address,
        value: TokenPayment.egldFromAmount(amount.value),
        chainID: networkConfig.ChainID,
        sender: account.value!.address
    });

    transaction.setNonce(account.value!.getNonceThenIncrement())
    transactionState.value = 'Waiting for transaction to be signed'
    
    erd.providers.signAndSend(transaction)
    .then((result: Transaction) => {
        transactionState.value = 'Waiting for transaction to be validated'
        transactionUrl.value = erd.explorerTransactionUrl(result);
        return erd.providers.transactionResult(result);
    }).catch((error: Error) => {
        console.error(error)
        transactionState.value = ''
        transactionResult.value = error
    });
}
</script>