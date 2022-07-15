import type VueErdJs from "./VueErdJs";
import type { IVueErdJsLogin } from "./VueErdJsLogin";

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $erd: VueErdJs;
        $erdLogin: IVueErdJsLogin;
    }
}
