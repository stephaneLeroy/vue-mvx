import {
    initVueErdJsPlugin,
    ProviderOption,
    ElrondEnvEnum,
    VueErdjsConnect,
    VueErdjs2FA,
} from "./VueErdJsPlugin";
import {providersOptions} from "./providers/Providers";
import type IQRCodeHandler from './components/xportal/IQRCodeHandler';
import { useVueErd } from "./composable/useVueErd";
import type { VueErdEvents } from "./events/VueErdEvents"
import type VueErdJs from "@/VueErdJs";

export * from './globalExtension'

export {
    IQRCodeHandler,
    ProviderOption,
    VueErdjsConnect,
    VueErdjs2FA,
    ElrondEnvEnum,
    providersOptions,
    initVueErdJsPlugin,
    useVueErd,
    VueErdEvents,
    VueErdJs
}
