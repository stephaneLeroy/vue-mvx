import VueErdJs from "./VueErdJs";

declare module 'vue/types/vue' {
    interface Vue {
        $erd: VueErdJs;
    }
}
