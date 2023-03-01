<template>
    <div class="vue3rdj5__mode-qr" v-show="!maiar.qrcode" ref="qrcodeSvg"></div>
    <div class="vue3rdj5__mode-qr" v-show="maiar.qrcode" v-html="maiar.qrcode"></div>
    <a
        v-if="maiar.deeplink && isMobile"
        class="vue3rdj5__mode-link vue3rdj5__mode-link-maiar"
        :href="maiar.deeplink">
        <img class="vue3rdj5__modes-logo vue3rdj5__modes-logo-maiar"
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM4SURBVHgB7Zs/TFNRFMY/K0pMpFQGExFDjYss6oaT1snJmMhmJJHFRYKTLjrK4kJVSIxLm4gmDpgYuhAmmexU4mBcTCUhmhiF/gmi0fA859KSR2n73uPe+9Jy7y858ELI4Z3vnnvuuQcAdpIgmyDLkzl7xHJkKbI4mhCrBN4uQe3WJiqx7gg+18IvrSMjtolgwsrXywTsw+a+yMNMLu3HphLnYCbFCMwNnrnKW8CBwURgOFYAGI4VAIZjBYDhWAFgOFYAGI4VAIronXuFo88f4UB/H3TRQb6P3L+DvuwsVCI9XekaHnJOrX/eMhJDfE2Fb7ZDF84Ln+6focq/kutw/6d3YnVq+be0jMJkGr9m5/GXnoMQiUXRfXsEsdGb4rme76XTFyGLtAC0EiL1vSi/mEF5+g3WF943/T5abUrzMfo8CC++37on/MogLUDv3Evx0n7hlVsZf4LfC9mtrOAVjt4YwmESs/PMgG9ffz58xPLgFcggLQCnfnT4mihOQeHV2yiW0EXB10vzRmwUSihOpcT24mcZlI3EWIgeSl3eEjopTqZEBskGXkX5TFCXELxleM8HLaZeaBuKchHj4tgh2Rdw4Cvjj6l4ZqED7VNhzgTOiKBCcLHkFdcVeJXQxuJ+heC9vUorzgUuDEL9vUCzE0NlZQ+KE7ZRfdjW1p78lnM6zw6E/h5Q1Qr7xau9LTxNoTSVVl7pmxGKAF6Bu6neH/i8D4OWPgW44ZHt9b3Q2Af4v9Q0g4X4cfch1uhGqQPlAqgKvBYW4CcJ0bKdYFh3Ad4Sq7Q1VAkhLUCQAueGz/ry9Awi3VGRLUFrhCohpAXoy2YC3eG5t+d0LlHw7oaHMyc2OoKDAXxxm/z18nXIEMpEiANdy8yLVfPq7TkbeD7gZyu1xESIaTQTlGlv2R+L0egIVTUTZKTbydqp8HGa4HK7q8I3Kq3zsdfPtEyFociJcyKbcXoejDlUCJUFXmuUCQ5tNyGwKp/2r8RgOFYAGI4VAIZjBYDhWAFgOFYAGA4L8AXmssgCvIW5LPKHBDRdX9vA4lUlkm3wsqotCRfG/+tsVQQTMiFZL3g3cbI09lZG5CuBJ2qD/Q8kCVa4M6fMMgAAAABJRU5ErkJggg=="
             alt="xPortal Logo">
        Login with xPortal app
    </a>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps, onMounted, reactive} from "vue";
import type {PropType} from "vue";
import QRCodeDefaultHandler from "./QRCodeDefaultHandler";
import type IQRCodeHandler from "./IQRCodeHandler";
import {ref} from "@vue/reactivity";
import platform from "platform";
import {useVueErd} from "@/composable/useVueErd";
import type {XPortalAppLoginData} from "@/providers/xportal-app/XPortalAppStrategy";

const props = defineProps({
    qrcodeHandler: {
        type: Object as PropType<IQRCodeHandler>,
        require: true,
        default() {
            return new QRCodeDefaultHandler()
        }
    },
    token: {
        require: false,
        type: String
    }
})

type Maiar = {
    qrcode: string | null,
    deeplink: string | null
}

const openContent = ref(false);
const maiar = reactive<Maiar>({ qrcode: null, deeplink: null });
const qrcodeSvg = ref();

const emit = defineEmits<{
    (event: 'login', mode: String): void
}>()

const { erd } = useVueErd();
if (!erd) {
    throw new Error('Cannot load erdjs. Please check your configuration')
}

const isMobile = computed(() => {
    return platform && platform.os ? platform.os.family === "iOS" || platform.os.family === "Android" : true;
});

const login = async () => {
    console.log("xPortal App Login")
    maiar.qrcode = null;
    maiar.deeplink = null;
    const loginData: XPortalAppLoginData | undefined = await erd.xportalApp?.login({token: props.token});
    if(!loginData) {
        console.log("No xPortal App login data available")
        return;
    }
    const svg = await props.qrcodeHandler.handle(loginData.qrCodeData, qrcodeSvg.value)
    maiar.deeplink = loginData.deeplink;
    if (svg) {
        maiar.qrcode = svg;
    }
}

onMounted(login);
</script>
