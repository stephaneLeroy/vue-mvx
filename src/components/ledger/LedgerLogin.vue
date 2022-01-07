<template>
    <div>
        <div @click="fetchAccounts()">
            <slot></slot>
        </div>
        <div v-if="error" :error="error">
            <slot name="error">{{error}}</slot>
        </div>
        <slot name="accounts" :accounts="accounts" :login="login">
            <ul>
                <li 
                    v-for="(account, index) in accounts"
                    :key="index"><a @click="login(startIndex + index)" :key="index">{{account}}</a></li>
            </ul>
        </slot>
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
    props: {
        addressPageSize: {
            type: Number,
            default: 5
        },
    },
    methods: {
        async fetchAccounts() {
            this.error = null;
            this.accounts.splice(0);
            this.accounts = await this.$erd.ledger.accounts(this.startIndex, this.startIndex + this.addressPageSize).catch((error) => {
                this.error = error;
            });
        },
        next() {
            this.startIndex = this.startIndex + this.addressPageSize;
            this.fetchAccounts();
        },
        previous() {
            if (this.startIndex == 0) {
                return;
            }
            this.startIndex=this.startIndex - this.addressPageSize;
            if(this.startIndex <= 0) {
                this.startIndex = 0;
            }
            this.fetchAccounts();
        },
        login(index) {
            this.$erd.ledger.login({ addressIndex: index })
        }
    }
}
</script>
