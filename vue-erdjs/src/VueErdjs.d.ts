import VueErdJs from "./VueErdJs";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $erd: VueErdJs;
    }
}

export {}
