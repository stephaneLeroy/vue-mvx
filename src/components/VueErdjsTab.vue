<template>
    <button
        class="vue3rdj5__modes-open"
        :class="[ selectedMode === name ? 'vue3rdj5__modes-open-active' : '' ]"
        @click="selectProvider()"
        type="button">
        <img
            class="vue3rdj5__modes-logo"
            :class="[ 'vue3rdj5__modes-logo-' + nameToClass ]"
            src="https://picsum.photos/200"
            :alt="name + ' Logo'">
        {{ name }}
    </button>
</template>

<script lang="ts" setup>
import {computed, defineProps, defineEmits} from 'vue';

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

const nameToClass = computed(() => props.name.toLowerCase().replace('/ /g', '-'));

function selectProvider() {
    if (props.selectedMode === props.name) {
        emit('select-mode', '');
    } else {
        emit('select-mode', props.name);
    }
}
</script>
