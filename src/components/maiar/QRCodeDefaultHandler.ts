import { IQRCodeHandler } from "./IQRCodeHandler";

class QRCodeDefaultHandler implements IQRCodeHandler {
    async handle(data: string, element: HTMLElement): Promise<any> {
        let QRCode = require('qrcode');
        return await QRCode.toString(data, {
            type: "svg",
        }).then((svg: any) => {
            return svg;
        });
    }
}

export default QRCodeDefaultHandler;
