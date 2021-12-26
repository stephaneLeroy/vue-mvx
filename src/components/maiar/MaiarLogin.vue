<template>
  <div>
    <div @click="login()">
      <slot>Maiar App login</slot>
    </div>
    <slot name="qrcode" v-bind:qrcode="qrcode">{{qrcode}}</slot>
    <slot v-if="deeplink && isMobile()" name="deeplink" v-bind:deeplink="deeplink"><a href="#">{{deepLink}}</a></slot>
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
