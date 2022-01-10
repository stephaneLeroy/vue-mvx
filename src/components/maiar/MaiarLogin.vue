<template>
    <div
        class="vue3rdj5__mode"
        v-if="openContent">
        <div class="vue3rdj5__mode-qr" ref="qrcode"></div>
        <div class="vue3rdj5__mode-qr" v-if="qrcode" v-html="qrcode"></div>
        <a
            class="vue3rdj5__mode-link vue3rdj5__mode-link-maiar"
            :href="deeplink"
            v-if="deeplink && isMobile()">
            <img class="vue3rdj5__modes-logo vue3rdj5__modes-logo-maiar" src="data:image/png;base64,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" alt="Maiar Logo">
            Login with Maiar app
        </a>
    </div>
</template>

<script>
import platform from "platform";
import QRCodeDefaultHandler from "./QRCodeDefaultHandler";

export default {
    name: 'MaiarLogin',
    data () {
        return {
            openContent: false,
            qrcode: null,
            deeplink: null
        }
    },
    props: {
        selectedMode: {
            type: String,
            default: ''
        },
        qrcodeHandler: {
            require: true,
            default: function() { return new QRCodeDefaultHandler() }
        },
        token: {
            require: false,
            type: String
        }
    },
    watch: {
        selectedMode (selectedMode) {
            if ( selectedMode === 'Maiar' ) {
                this.login();
            } else {
                this.openContent = false;
            }
        }
    },
    methods: {
        isMobile() {
            return platform.os.family === "iOS" || platform.os.family === "Android";
        },
        login() {
            console.log("Maiar App Login")
            this.openContent = true;
            this.qrcode = null;
            this.deepLink = null;
            const that = this;
            const options = this.token ? { token: this.token } : {}
            this.$erd.maiarApp.login(options).then((loginData) => {
                console.log(loginData)
                this.qrcodeHandler.handle(loginData.qrCodeData, this.$refs.qrcode).then((svg) => {
                    if(svg) {
                        this.qrcode = svg;
                    }
                })
                that.deeplink = loginData.deeplink;
                that.$emit('login', loginData);
            });
        }
    }
}
</script>
