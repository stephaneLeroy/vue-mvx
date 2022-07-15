<template>
    <div
        class="vue3rdj5__mode"
        v-if="openContent">
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
    </div>
</template>

<script lang="ts" setup>
import {defineProps, inject, watchEffect} from "vue";
import {ref} from "@vue/reactivity";
import type VueErdJs from "@/VueErdJs";

const error = ref();
const openContent = ref(false);

const props = defineProps({
    selectedMode: {
        type: String,
        default: () => {
            return ''
        }
    },
    token: {
        require: false,
        type: String
    }
})

const erdJS = inject<VueErdJs>('$erd');
if (!erdJS) {
    throw new Error('Cannot load erdjs. Please check your configuration')
}

const login = () => {
    const options = props.token ? {token: props.token, callbackUrl: window.location.toString()} : {};
    erdJS.defiWallet.login(options);
}
watchEffect(() => {
    if (props.selectedMode === 'Defi Wallet') {
        login()
        openContent.value = true;
    } else {
        openContent.value = false;
    }
});
</script>
