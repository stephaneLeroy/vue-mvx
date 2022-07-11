import {
    onBeforeMount
} from "vue";
import type VueErdJs from "@/VueErdJs";

export const useVueErd = (vueErdJs: VueErdJs) => {
    onBeforeMount(() => {
        vueErdJs.providers.init();
        vueErdJs.providers.onUrl(window.location);
    })
    return;
}
