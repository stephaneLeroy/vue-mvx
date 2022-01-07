<template>
    <maiar-login>
        <a href="#">Login with Maiar App</a>
        <template v-slot:qrcode="{ qrcode }">
            <qr-code class="qrcode" :qrcode="qrcode"></qr-code>
        </template>
        <template v-slot:deeplink="{ deeplink }">
            <a :href="deeplink">Maiar App DeepLink</a>
        </template>
    </maiar-login>
</template>

<script>
import QrCode from "./QrCode";

export default {
    name: 'Maiar',
    components: {
        'qr-code': QrCode
    },
    data () {
        return {
            qrcode: null,
            deepLink: null
        }
    },
}
</script>
