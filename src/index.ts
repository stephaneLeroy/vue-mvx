import VueErdJsPlugin, { vueErdJsStore, ProviderOption, ElrondEnvEnum, VueErdjsConnect } from "./VueErdJsPlugin";
import { providersOptions } from "./providers/Providers";
import * as qrcode from "./components/maiar/IQRCodeHandler";

export type IQRCodeHandler = qrcode.IQRCodeHandler;
export { vueErdJsStore, ProviderOption, VueErdjsConnect, ElrondEnvEnum, providersOptions }
export default VueErdJsPlugin;
