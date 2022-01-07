<template>
    <maiar-login>
        <button
            class="vue3rdj5__mode-tab"
            type="button">
            <img class="vue3rdj5__mode-logo vue3rdj5__mode-logo-maiar" src="/assets/maiar-logo.png" alt="Maiar Logo">
            Connect with Maiar
        </button>
        <template v-slot:qrcode="{ qrcode }">
            <qr-code class="qrcode" :qrcode="qrcode"></qr-code>
        </template>
        <template v-slot:deeplink="{ deeplink }">
            <a
                :href="deeplink"
                class="vue3rdj5__mode-link vue3rdj5__mode-link-maiar">
                <img class="cntnt__login-logo cntnt__login-logo-maiar" src="/assets/maiar-logo.png" alt="Maiar Logo">
                Login with Maiar app
            </a>
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
