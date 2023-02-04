import type IQRCodeHandler from "./IQRCodeHandler";
import QRCode from 'qrcode';

class QRCodeDefaultHandler implements IQRCodeHandler {
    handle(data: string, element: HTMLElement): Promise<any> {
        return QRCode.toString(data, {
            type: "svg",
        }).then((svg: any) => {
            return svg;
        });
    }
}

export default QRCodeDefaultHandler;
