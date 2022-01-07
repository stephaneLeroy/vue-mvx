<template>
    <div>
        <div v-if="!qrcode" @click.stop="login()">
            <slot>Maiar App login</slot>
        </div>
        <slot name="qrcode" v-bind:qrcode="qrcode">{{qrcode}}</slot>
        <div v-if="deeplink && isMobile()">
            <slot name="deeplink" v-bind:deeplink="deeplink"><a :href="deepLink">Login with Maiar App</a></slot>
        </div>
    </div>
</template>

<script>
import platform from "platform";

export default {
    name: 'MaiarLogin',
    data () {
        return {
            qrcode: null,
            deeplink: null
        }
    },
    methods: {
        isMobile() {
            return platform.os.family === "iOS" || platform.os.family === "Android";
        },
        login() {
            console.log("Maiar App Login")
            this.qrcode = null;
            this.deepLink = null;
            const that = this;
            this.$erd.maiarApp.login().then((loginData) => {
                that.qrcode = loginData.qrCodeData;
                that.deeplink = loginData.deeplink;
                that.$emit('login', loginData);
            });
        }
    }
}
</script>
