<template>
    <button
        class="vue3rdj5__modes-open"
        :class="[ active ? 'vue3rdj5__modes-open-active' : '' ]"
        @click="selectProvider(name)"
        type="button">
        <img
            class="vue3rdj5__modes-logo"
            :class="[ 'vue3rdj5__modes-logo-' + nameToClass ]"
            :src="logo"
            :alt="name + ' Logo'">
        {{ name }}
    </button>
    <div
        class="vue3rdj5__mode"
        v-if="active">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps} from 'vue';
import logos from '@/components/logos';

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits<{
    (event: 'select-mode', mode: String): void
}>()

function selectProvider(name: string) {
    if (props.active) {
        emit('select-mode', '');
    } else {
        emit('select-mode', name);
    }
}

const nameToClass = computed(() => props.name.toLowerCase().replace(/ /g, '-'))
const logo = computed(() => {
    return logos.get(props.name);
})

</script>
