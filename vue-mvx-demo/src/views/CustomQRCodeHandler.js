// @ts-ignore
import qrcodeOptions from './qrcode-style';
import QRCodeStyling from 'qr-code-styling';
import elrondLogo from '../assets/elrond-logo.png';
qrcodeOptions.image = elrondLogo;
class CustomQRCodeHandler {
    qrcode = new QRCodeStyling(Object.assign(qrcodeOptions));
    handle(data, element) {
        console.log("Handle", data, element);
        qrcodeOptions.data = data;
        this.qrcode.update(Object.assign(qrcodeOptions));
        this.qrcode.append(element);
        return Promise.resolve(undefined);
    }
}
export default CustomQRCodeHandler;
