<template>
    <div
        class="vue3rdj5__mode"
        v-if="openContent">
        <div
            class="vue3rdj5__mode-error"
            v-if="error"
            :error="error">
            {{error}}
        </div>
        <div v-else-if="accounts.length === 0" class="vue3rdj5__infos">
            <p class="vue3rdj5__infos-txt">Please connect and unlock your Ledger Wallet.</p>
            <p class="vue3rdj5__infos-txt">Don't forget to open Elrond APP</p>
        </div>
        <div class="vue3rdj5__ledger">
            <ul class="vue3rdj5__ledger-list">
                <li
                    class="vue3rdj5__ledger-item"
                    v-for="(account, index) in accounts"
                    :key="index">
                    <a
                        class="vue3rdj5__ledger-link"
                        @click="login(startIndex + index)"
                        href="#">{{ account }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LedgerLogin',
    data () {
        return {
            startIndex: 0,
            accounts: [],
            error: null,
            openContent: false
        }
    },
    props: {
        addressPageSize: {
            type: Number,
            default: 5
        },
        selectedMode: {
            type: String,
            default: ''
        },
        token: {
            require: false,
            type: String
        }
    },
    watch: {
        selectedMode (selectedMode) {
            if ( selectedMode === 'Ledger' ) {
                this.fetchAccounts();
            } else {
                this.openContent = false;
            }
        }
    },
    methods: {
        async fetchAccounts() {
            this.openContent = true;
            this.error = null;
            this.accounts.splice(0);
            this.accounts = await this.$erd.ledger.accounts(this.startIndex, this.startIndex + this.addressPageSize).catch((error) => {
                this.error = "Error while trying to read your Ledger wallet. " +
                    "Please make sure you have unlock it and that your Elrond app is opened";
                return [];
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
            const token = this.token ? { token: this.token } : {}
            this.$erd.ledger.login({ addressIndex: index, ...token })
        }
    }
}
</script>
