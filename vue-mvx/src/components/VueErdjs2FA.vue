<template>
  <div class="modal" v-if="showModal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">X</button>
      <h2>Two-Factor Authentication</h2>
      <div class="code-input">
        <input id="code1" v-model="code1" @input="handleInput(1)" type="text" maxlength="1" />
        <input id="code2" v-model="code2" @input="handleInput(2)" type="text" maxlength="1" />
        <input id="code3" v-model="code3" @input="handleInput(3)" type="text" maxlength="1" />
        <span class="auth-span">-</span>
        <input id="code4" v-model="code4" @input="handleInput(4)" type="text" maxlength="1" />
        <input id="code5" v-model="code5" @input="handleInput(5)" type="text" maxlength="1" />
        <input id="code6" v-model="code6" @input="handleInput(6)" type="text" maxlength="1" />
      </div>
      <div v-if="hasError" class="error-message">Wrong 2FA code? Please try again.</div>
      <a @click="resetCode">Reset</a>
      <button class="submit-button" @click="submitCode" :disabled="isSubmitDisabled">Submit</button>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  hasError: Boolean,
});

const emit = defineEmits(['submit', 'reset', 'closed']);

const showModal = ref(true);
const code1 = ref('');
const code2 = ref('');
const code3 = ref('');
const code4 = ref('');
const code5 = ref('');
const code6 = ref('');

const isSubmitDisabled = computed(() => {
  return ![code1, code2, code3, code4, code5, code6].every((code) => code.value.length === 1);
});

const handleInput = (boxNumber: number) => {
  const codes = [code1, code2, code3, code4, code5, code6];
  const code = codes[boxNumber - 1].value;
  if (code && !/^\d$/.test(code)) {
    codes[boxNumber - 1].value = '';
    return;
  }
  if (boxNumber < 6 && code) {
    (document.getElementById(`code${boxNumber + 1}`) as HTMLInputElement)?.focus();
  }
};

const submitCode = () => {
  const fullCode = [code1, code2, code3, code4, code5, code6].map((ref) => ref.value).join('');
  console.log('Submitted code:', fullCode);
  emit('submit', fullCode); // Emit the submitted code
};

const resetCode = () => {
  code1.value = '';
  code2.value = '';
  code3.value = '';
  code4.value = '';
  code5.value = '';
  code6.value = '';
  emit('reset'); // Emit the reset event
};

const closeModal = () => {
  emit('closed'); // Emit the closed event
};
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
