import { ApiProvider, ProxyProvider } from "@elrondnetwork/erdjs";
import VueErdJs from "./VueErdJs";

declare module 'vue/types/vue' {
    interface Vue {
        $erd: VueErdJs;
        $erdProxy: ProxyProvider;
        $erdApi: ApiProvider
    }
}
