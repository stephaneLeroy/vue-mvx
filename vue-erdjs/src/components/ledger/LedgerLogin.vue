<template>
    <div
        class="vue3rdj5__mode"
        v-if="openContent">
        <div
            class="vue3rdj5__mode-error"
            v-if="error !== ''"
            :error="error">
            {{ error }}
        </div>
        <div v-if="accounts.length === 0" class="vue3rdj5__infos">
            <p class="vue3rdj5__infos-txt">Please connect and unlock your Ledger Wallet.</p>
            <p class="vue3rdj5__infos-txt">Don't forget to open Elrond APP</p>
        </div>
        <div class="vue3rdj5__ledger">
            <ul class="vue3rdj5__ledger-list">
                <li
                    class="vue3rdj5__ledger-item"
                    v-for="(account, index) in accounts"
                    :key="index">
                    <a
                        class="vue3rdj5__ledger-link"
                        @click="login(startIndex + index)"
                        href="#">{{ account }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed, defineProps, reactive, watchEffect} from "vue";
import {ref} from "@vue/reactivity";
import {useVueErd} from "@/composable/useVueErd";

const startIndex = ref(0);
const accounts = reactive([] as string[]);
const error = ref('');
const openContent = ref(true);

const props = defineProps({
    addressPageSize: {
        type: Number,
        default: 5
    },
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

const { erd } = useVueErd();
if (!erd) {
    throw new Error('Cannot load erdjs. Please check your configuration')
}

watchEffect(() => {
    if (props.selectedMode === 'Ledger') {
        console.log("Ledger", props.selectedMode)
        openContent.value = true;
        fetchAccounts();
    } else {
        openContent.value = false
    }
});

async function fetchAccounts()  {
    error.value = '';
    accounts.splice(0);
    console.log("Ledger fetch account");
    const fetchedAccounts = await erd!.ledger.accounts(startIndex.value, startIndex.value + props.addressPageSize)
    .catch(() => {
        error.value = "Error while trying to read your Ledger wallet. " +
            "Please make sure you have unlock it and that your Elrond app is opened";
        return [];
    })
    console.log("Ledger fetched", fetchedAccounts);
    fetchedAccounts.forEach((account: string) => {
        accounts.push(account)
    })

}

const next = () => {
    startIndex.value = startIndex.value + props.addressPageSize;
    fetchAccounts();
}

const previous = () => {
    if (startIndex.value == 0) {
        return;
    }
    startIndex.value = startIndex.value - props.addressPageSize;
    if (startIndex.value <= 0) {
        startIndex.value = 0;
    }
    fetchAccounts();
}

const login = async (index: number) => {
    const token = props.token ? {token: props.token} : {}
    await erd.ledger.login({addressIndex: index, ...token})
}

const selected = computed(() => {
    return props.selectedMode === 'Ledger'
})

</script>
