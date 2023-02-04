<template>
        <div
            class="vue3rdj5__mode-error"
            v-if="error">
            {{ error }}
        </div>
        <div v-else class="vue3rdj5__infos">
            <p class="vue3rdj5__infos-txt">
                Please unlock your Defi Extension and select the wallet you want to connect.
            </p>
            <p class="vue3rdj5__infos-txt">
                If Nothing happen, you migth not have installed the Maiar Defi Wallet Extension.
            </p>
            <p class="vue3rdj5__infos-txt">
                You can download it <a class="vue3rdj5__infos-link"
                                       href="https://chrome.google.com/webstore/detail/maiar-defi-wallet/dngmlblcodfobpdpecaadgfbcggfjfnm">here</a>
            </p>
        </div>
</template>

<script lang="ts" setup>
import {defineProps, onBeforeUpdate, onMounted} from "vue";
import {ref} from "@vue/reactivity";
import {useVueErd} from "@/composable/useVueErd";

const error = ref();

const props = defineProps({
    token: {
        require: false,
        type: String
    }
})

const { erd } = useVueErd();
if (!erd) {
    throw new Error('Cannot load erdjs. Please check your configuration')
}

const login = async () => {
    console.log("Defi Extension Login");
    const options = props.token ? {token: props.token, callbackUrl: window.location.toString()} : {};
    await erd.defiWallet.login(options);
}
onMounted(login);
onBeforeUpdate(() => {
    console.log("Defi Extension update");
})
</script>
