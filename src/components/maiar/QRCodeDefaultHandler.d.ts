import { IQRCodeHandler } from "./IQRCodeHandler";
declare class QRCodeDefaultHandler implements IQRCodeHandler {
    handle(data: string, element: HTMLElement): Promise<any>;
}
export default QRCodeDefaultHandler;
