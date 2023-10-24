<template>
  <div class="modal" v-if="showModal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">X</button>
      <h2>Two-Factor Authentication</h2>
      <input v-model="code" type="text" placeholder="Enter 2FA code" />
      <button @click="submitCode">Submit</button>
      <a @click="resetCode">Reset</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import {useVueErd} from "@/composable/useVueErd";
const { erd, account } = useVueErd();

const emit = defineEmits(['submit', 'reset']);

const showModal = ref(true);
const code = ref('');

const submitCode = () => {
  // Handle code submission here
  console.log('Submitted code:', code.value);
  emit('submit', code.value); // Emit the submitted code
};

const resetCode = () => {
  code.value = '';
  emit('reset'); // Emit the reset event
};

const closeModal = () => {
  showModal.value = false;
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
  padding: 8px;
  font-size: 16px;
  width: 80%;
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
</style>
