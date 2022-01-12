import VueErdJsPlugin, { vueErdJsStore } from "./VueErdJsPlugin";
import * as qrcode from "./components/maiar/IQRCodeHandler";

export type IQRCodeHandler = qrcode.IQRCodeHandler;
export { vueErdJsStore }
export default VueErdJsPlugin;
