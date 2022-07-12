import type { Plugin } from "vue";
import { VueErdjsConnect } from "./components";
import { ElrondEnvEnum, ProviderOption } from "./providers/config";
export { ProviderOption, ElrondEnvEnum, VueErdjsConnect };
export declare const VueErdJsPlugin: Plugin;
export declare function useErdJs(): unknown;
