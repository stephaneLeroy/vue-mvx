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

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    props: {
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
    },
    emits: ['select-mode'],
    methods: {
        selectProvider() {
            if (this.selectedMode === this.name) {
                this.$emit('select-mode', '');
            } else {
                this.$emit('select-mode', this.name);
            }
        }
    },
    computed: {
        nameToClass: function () {
            return this.name.toLowerCase().replace('/ /g', '-')
        }
    }
});


</script>
