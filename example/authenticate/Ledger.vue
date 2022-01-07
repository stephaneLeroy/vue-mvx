<template>
    <div>
        <h2>Ledger</h2>
        <ledger-login>
            <a href="#">Show accounts</a>
            <template v-slot:accounts="{accounts, login}">
                <ul>
                    <li 
                        v-for="(account, index) in accounts"
                        :key="index"><a @click="login(index)" href="#">{{account}}</a></li>
                </ul>
            </template>
        </ledger-login>
    </div>
</template>

<script>
export default {
    name: 'Ledger',
    data () {
        return {
            qrcode: null,
            deepLink: null
        }
    },
}
</script>
