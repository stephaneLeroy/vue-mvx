import { IQRCodeHandler } from "../../src/components/maiar/IQRCodeHandler";
declare class CustomQRCodeHandler implements IQRCodeHandler {
    private qrcode;
    handle(data: string, element: HTMLElement): Promise<any>;
}
export default CustomQRCodeHandler;
