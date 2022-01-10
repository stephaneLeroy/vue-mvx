<template>
    <div
        class="vue3rdj5__mode"
        v-if="openContent">
        <div
            class="vue3rdj5__mode-error"
            v-if="error">
            {{error}}
        </div>
        <div v-else class="vue3rdj5__infos">
            <p class="vue3rdj5__infos-txt">
                Please unlock your Defi Extension and select the wallet you want to connect.
            </p>
            <p class="vue3rdj5__infos-txt">
                If Nothing happen, you migth not have installed the Maiar Defi Wallet Extension.
            </p>
            <p class="vue3rdj5__infos-txt">
                You can download it <a class="vue3rdj5__infos-link" href="https://chrome.google.com/webstore/detail/maiar-defi-wallet/dngmlblcodfobpdpecaadgfbcggfjfnm">here</a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DefiWalletLogin',
    data () {
        return {
            error: null,
            openContent: false
        }
    },
    props: {
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
            console.log("Defi", selectedMode)
            if ( selectedMode === 'Defi Wallet' ) {
                this.login(selectedMode)
                this.openContent = true;
            } else {
                this.openContent = false;
            }
        }
    },
    methods: {
        login (name) {
            this.$emit('select-mode', name);
            const options = this.token ? { token: this.token, callbackUrl: window.location  } : {};
            this.$erd.defiWallet.login(options);
        }
    }
}
</script>
