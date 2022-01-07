<template>
    <div class="vue3rdj5__mode">
        <button
            class="vue3rdj5__mode-open"
            @click="fetchAccounts()"
            type="button">
            <img class="vue3rdj5__mode-logo vue3rdj5__mode-logo-ledger" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4wIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRTI2MERCNzQwNkMxMUVDOTgyNEM0MTkzNTkwMTc2QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRTI2MERCODQwNkMxMUVDOTgyNEM0MTkzNTkwMTc2QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMjYwREI1NDA2QzExRUM5ODI0QzQxOTM1OTAxNzZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVFMjYwREI2NDA2QzExRUM5ODI0QzQxOTM1OTAxNzZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hU6k9QAABbZJREFUeNrs3M1rXFUYwOE5zbTpRxzEtCCGuilduXfnUsS6difd1bX4F7j2T5CC4LYb1+LGgtitoCIIgkI/oEZKP2IzTXJ8bz2zEMrcZu6dzJzJ88BrSiGX5L3j785tyE055wFADU5YASBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAR2/Y/CeldLf5ELNTPrL8mofxny7n8OOYr61kqpMxX8W8G/O47I96XuujmO+H5S9et5OqvWYFL3VxfiNmswz12XJLuBrGVtBq356q90ywgGoIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFv3zhA0Ei2qsW8FLRX1kDXUb9nScb2J+jdkYeM7QIi44P1lFq+ZpDTdifil/5mh33zwp4/2YS52OlPPzvuSO855zArT4smNnfujrltCtJTDNmWUKzZrzAUyR+uiNd0ZANQQLECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsADBsgJAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwZrIVgnMuxN9BeuUcwG0tGa94zHWhuUPf5YDPo1Jh6jlsHwRj5yPhbocczFmPMNVrDmHT2J+jHlmlczJfsxfMQ9itg/5uQcxmzG3U855kFK60OEt24nyRYydk4W5HvPhjOevuUD9HvNBzB2rZE6a19lGzLmYvRluJZsL6+7kHdZ9+6za2ZhRh88flasYzEsud2Kd7sb8lHB13m53/Xw/OGHpCRYgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAYJlBYBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBQgWgGABCBYgWACCBSBY9OnAChAsavHEClh2QysgbMXciNmJWV+x7y2X76mZz2K+c7oFi7qdjblyDL7PS4LllhBqsWcFggUgWACCBQgWgGABCBYgWACCBQgWgGABCBb/t2YFXu/HweSXny+Uj3nGF8GDmLF1LkzzlIWHM56/4yIN/C7hove/EXNuhvOQS6t2U855kFL6o4TnaTnwYQ7SPLbjasy3zsnCXI65WC4aovXid6DN6/vnmPvWsRBnYj6P+Shm+5Cf2zxccjPm5uQd1psdv5hXnI+F+q0MLPNF43zMq2VmsdXXPb3bQaDtXdJux2Ps9xWs5HwA8+6En5oA1RAsQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAAQLECwAwQIEywoAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBGti3yqBKXLMwbIE68D5AKb4p4+DDHv6Yj6NuRKzUUrK0b5D/iLmlnW0vtY/iXnLHcGRa/Y9jnmn64FSznmQUhKZul2LuW4NU63H3Ix52yqqdcs/uq+GXSto1VyUH1rDatxSUP//jCBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQjW6jplBa3W7Kl6JyfPw7oXk2J2ykeWX/MLz6cH/z3n6W/raLUXcydmO+bxwC+M1/ZaH8Xcfv48LAC3hACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIF8EL/CjAAlUuwcFQMH5EAAAAASUVORK5CYII=" alt="Ledger Logo">
            Connect with Ledger
        </button>
        <div 
            class="vue3rdj5__content"
            v-if="openContent">
            <div
                class="vue3rdj5__mode-error"
                v-if="error"
                :error="error">
                {{error}}
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
    </div>
</template>

<script>
export default {
    name: 'LedgerLogin',
    data () {
        return {
            startIndex: 0,
            accounts: [],
            error: null,
            openContent: false
        }
    },
    props: {
        addressPageSize: {
            type: Number,
            default: 5
        },
    },
    methods: {
        async fetchAccounts() {
            this.openContent = true;
            this.error = null;
            this.accounts.splice(0);
            this.accounts = await this.$erd.ledger.accounts(this.startIndex, this.startIndex + this.addressPageSize).catch((error) => {
                this.error = error;
            });
        },
        next() {
            this.startIndex = this.startIndex + this.addressPageSize;
            this.fetchAccounts();
        },
        previous() {
            if (this.startIndex == 0) {
                return;
            }
            this.startIndex=this.startIndex - this.addressPageSize;
            if(this.startIndex <= 0) {
                this.startIndex = 0;
            }
            this.fetchAccounts();
        },
        login(index) {
            this.$erd.ledger.login({ addressIndex: index })
        }
    }
}
</script>
