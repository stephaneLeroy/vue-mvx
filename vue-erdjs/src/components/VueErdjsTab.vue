<template>
    <button
        class="vue3rdj5__modes-open"
        :class="[ selectedMode === name ? 'vue3rdj5__modes-open-active' : '' ]"
        @click="selectProvider()"
        type="button">
        <img
            class="vue3rdj5__modes-logo"
            :class="[ 'vue3rdj5__modes-logo-' + nameToClass ]"
            :src="logos.get(name)"
            :alt="name + ' Logo'">
        {{ name }}
    </button>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps} from 'vue';
import {ref} from "@vue/reactivity";
import type {Ref} from "@vue/reactivity";
import DefaultWalletLogo from "@/components/logos/DefaultWalletLogo";
import LedgerLogo from "@/components/logos/LedgerLogo";
import MaiarLogo from "@/components/logos/MaiarLogo";

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    selectedMode: {
        type: String,
        default: ''
    }
})

const emit = defineEmits<{
    (event: 'select-mode', mode: String): void
}>()

function selectProvider() {
    if (props.selectedMode === props.name) {
        emit('select-mode', '');
    } else {
        emit('select-mode', props.name);
    }
}

const nameToClass = computed(() => props.name.toLowerCase().replace(/ /g, '-'))

const logos: Ref<Map<string, string>> = ref(new Map());

logos.value.set('Defi Wallet', DefaultWalletLogo);
logos.value.set('Web Wallet', DefaultWalletLogo);
logos.value.set('Ledger', LedgerLogo);
logos.value.set('Maiar', MaiarLogo);

</script>
