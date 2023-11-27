<template>
    <div class="vue3rdj5__modal" v-if="showModal" @click="closeModal">
        <div class="vue3rdj5__modal__content" @click.stop>
            <button class="vue3rdj5__modal__content__close-button" @click="closeModal">X</button>
            <h2>Two-Factor Authentication</h2>
            <section v-if="isCodeValid">
                <h3>Valid 2FA code</h3>
                <h3>Please sign the transaction on your device</h3>
                <div class="loader"></div>
            </section>
            <section v-else>
                <div class="vue3rdj5__modal__content__code-input">
                    <input
                        v-for="index in 3"
                        :key="'code' + index"
                        :id="'code' + index"
                        v-model="codes[index - 1]"
                        @input="handleInput(index)"
                        @keydown="handleBackspace(index, $event)"
                        type="text"
                        maxlength="1"
                    />
                    <span class="vue3rdj5__modal__content__auth-span">-</span>
                    <input
                        v-for="index in [4, 5, 6]"
                        :key="'code' + index"
                        :id="'code' + index"
                        v-model="codes[index - 1]"
                        @input="handleInput(index)"
                        @keydown="handleBackspace(index, $event)"
                        type="text"
                        maxlength="1"
                    />
                </div>
                <div v-if="hasError" class="vue3rdj5__modal__content__error-message">
                    Wrong 2FA code? Please try again.
                </div>
                <a class="vue3rdj5__modal__content__reset" @click="resetCode">Reset</a>
                <button
                    class="vue3rdj5__modal__content__submit-button"
                    @click="submitCode"
                    :disabled="isSubmitDisabled"
                >
                    Submit
                </button>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onUnmounted, onMounted, ref } from "vue"
import { computed } from "vue"
import { set2FACode } from "@/services/TwoFAService"
import { EventBus } from "@/events/VueErdEvents"

/*const props = defineProps({
    hasError: Boolean,
})*/

const showModal = ref(false)
const isCodeValid = ref(false)
const codes = ref(["", "", "", "", "", ""])

const hasError = ref(false)

const showModalListener = () => {
    showModal.value = true
    isCodeValid.value = false // Reset the validation flag when the modal is shown
}

const closeModalListener = () => {
    showModal.value = false
    isCodeValid.value = false // Reset the validation flag when the modal is shown
    hasError.value = false
    resetCode()
}

const errorListener = () => {
    hasError.value = true
}

const validCodeListener = () => {
    isCodeValid.value = true // Set the flag to true when the valid-code event is emitted
}

onMounted(() => {
    EventBus.on("show-modal", showModalListener)
    EventBus.on("close-modal", closeModalListener)
    EventBus.on("valid-code", validCodeListener)
    EventBus.on("error", errorListener)
})

onUnmounted(() => {
    EventBus.off("show-modal", showModalListener)
    EventBus.off("close-modal", closeModalListener)
    EventBus.off("valid-code", validCodeListener)
    EventBus.off("error", errorListener)
})

const isSubmitDisabled = computed(() => {
    const fullCode = codes.value.join("")
    return fullCode.length < 6
})

const handleInput = (boxNumber: number) => {
    const code = codes.value[boxNumber - 1]
    if (code && !/^\d$/.test(code)) {
        codes.value[boxNumber - 1] = ""
        return
    }
    if (boxNumber < 6 && code) {
        ;(
            document.getElementById(`code${boxNumber + 1}`) as HTMLInputElement
        )?.focus()
    }
}

const handleBackspace = (boxNumber: number, event: KeyboardEvent) => {
    if (event.key === "Backspace" && codes.value[boxNumber - 1] === "") {
        if (boxNumber > 1) {
            ;(
                document.getElementById(
                    `code${boxNumber - 1}`
                ) as HTMLInputElement
            )?.focus()
        }
    }
}

const submitCode = () => {
    const fullCode = codes.value.join("")
    set2FACode(fullCode)
}

const resetCode = () => {
    codes.value = ["", "", "", "", "", ""]
}

const closeModal = () => {
    showModal.value = false
    hasError.value = false
    resetCode()
    EventBus.emit("closed")
}
</script>
