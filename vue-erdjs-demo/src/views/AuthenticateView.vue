<template>
  <div class="about">
      <vue-erdjs-connect :qrcodeHandler="qrcodeHandler" :token="'hello'" ></vue-erdjs-connect>
  </div>
</template>

<script lang="ts">
import 'vue-erdjs/dist/index.css'
import CustomQRCodeHandler from "./CustomQRCodeHandler";
import {defineComponent} from "vue";

export default defineComponent( {
    data() {
        return {
            qrcodeHandler: CustomQRCodeHandler
        }
    }
})
</script>
