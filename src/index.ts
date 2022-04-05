import {VueErdJsPlugin, vueErdJsStore, ProviderOption, ElrondEnvEnum, VueErdjsConnect, useErdJs } from "./VueErdJsPlugin";
import { providersOptions } from "./providers/Providers";
import * as qrcode from "./components/maiar/IQRCodeHandler";

export type IQRCodeHandler = qrcode.IQRCodeHandler;
export { vueErdJsStore, ProviderOption, VueErdjsConnect, ElrondEnvEnum, providersOptions, useErdJs }
export default VueErdJsPlugin;
