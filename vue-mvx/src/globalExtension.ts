import type VueErdJs from "./VueErdJs";
import type { IVueErdJsAccount } from "./VueErdJsAccount";

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $erd: VueErdJs;
        $erdAccount: IVueErdJsAccount;
    }
}
