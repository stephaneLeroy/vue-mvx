import VueErdJs from "./VueErdJs";
import VueRouter from "vue-router";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $erd: VueErdJs;
        $router: VueRouter;
    }
}

export {}
