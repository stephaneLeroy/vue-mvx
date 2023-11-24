<template>
    <div class="modal" v-if="showModal" @click="closeModal">
        <div class="modal-content" @click.stop>
            <button class="close-btn" @click="closeModal">X</button>
            <h2>Two-Factor Authentication</h2>
            <section v-if="isCodeValid">
                <h3>Valid 2FA code</h3>
                <h3>Please sign the transaction on your device</h3>
                <div class="loader"></div>
            </section>
            <section v-else>
                <div class="code-input">
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
                    <span class="auth-span">-</span>
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
                <div v-if="hasError" class="error-message">
                    Wrong 2FA code? Please try again.
                </div>
                <a @click="resetCode">Reset</a>
                <button
                    class="submit-button"
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

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000; /* Set a high z-index value */
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    position: relative;
}

input {
    margin-bottom: 10px;
    height: 20px;
    margin-right: 2px;
    margin-left: 2px;
    padding-top: 10px;
    width: 20px !important;
    padding-bottom: 10px;
    font-size: 16px;
}

button {
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
}

a {
    font-size: 16px;
    color: blue;
    cursor: pointer;
}

.close-btn {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;
}

.code-input {
    display: flex;
    align-items: center;
    justify-content: center;
}

input {
    width: 40px;
    text-align: center;
}

.auth-span {
    margin: 10px 5px 20px 5px;
}

.submit-button {
    display: inline-block;
    border: none; /* Remove border */
    border-radius: 0.375rem; /* 6px */
    padding: 0.5rem 0.75rem; /* 8px 12px */
    text-align: center;
    text-decoration: none;
    margin-bottom: 0;
    margin-left: 20px;
    background-color: #007bff; /* Bootstrap blue */
    color: #ffffff;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3; /* Darker blue */
}

.submit-button:disabled {
    background-color: #e2e2e2; /* Light gray */
    color: #000000;
    cursor: not-allowed;
}

.error-message {
    color: rgb(255, 100, 100);
    font-size: small;
    margin-bottom: 10px;
}
</style>
