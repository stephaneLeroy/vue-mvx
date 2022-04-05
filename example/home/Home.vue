<template>
    <h1>Welcome</h1>
</template>

<script lang="ts">
import { defineComponent} from "vue";

export default defineComponent({
    name: 'Home',
    data () {
        return {
            qrcode: null,
            deepLink: null
        }
    },
})
</script>
