import {
    VueErdJsPlugin,
    vueErdJsStore,
    ProviderOption,
    ElrondEnvEnum,
    VueErdjsConnect,
    useErdJs
} from "./VueErdJsPlugin";
import {providersOptions} from "./providers/Providers";
import type IQRCodeHandler from './components/maiar/IQRCodeHandler';

export default VueErdJsPlugin;
export {
    IQRCodeHandler,
    vueErdJsStore,
    ProviderOption,
    VueErdjsConnect,
    ElrondEnvEnum,
    providersOptions,
    useErdJs
}
