import _Vue from "vue";
import VueErdJsStore from './VueErdJsStore';
import { ProviderOption } from "./providers/config";
declare const vueErdJsStore: VueErdJsStore;
export { vueErdJsStore };
export default function VueErdJsPlugin(Vue: typeof _Vue, options?: ProviderOption): void;
