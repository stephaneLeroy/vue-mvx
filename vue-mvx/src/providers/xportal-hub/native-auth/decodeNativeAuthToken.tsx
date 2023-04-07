import { decodeBase64 } from './base64Utils';
import { decodeLoginToken } from './decodeLoginToken';
import type { DecodedLoginTokenType } from './decodeLoginToken';

function isString(x: any) {
  return Object.prototype.toString.call(x) === '[object String]';
}

export class DecodedNativeAuthTokenType {
    address: string;
    body: string;
    signature: string;
    loginToken?: DecodedLoginTokenType

    constructor(address: string, body: string, signature: string, loginToken?: DecodedLoginTokenType) {
        this.address = address;
        this.body = body;
        this.signature = signature;
        this.loginToken = loginToken;
    }

    getExpiration() {
        if(!this.loginToken) {
            return 0;
        }
        return this.loginToken.getExpiration();
    }
}

export const decodeNativeAuthToken = (
  accessToken?: string
): DecodedNativeAuthTokenType | null => {
  if (!accessToken || !isString(accessToken)) {
    return null;
  }

  const parts = accessToken.split('.');

  if (parts.length !== 3) {
    console.error(
      'Invalid nativeAuthToken. You may be trying to decode a loginToken. Try using decodeLoginToken method instead'
    );
    return null;
  }

  try {
    const [address, body, signature] = parts;
    const parsedAddress = decodeBase64(address);
    const parsedBody = decodeBase64(body);
    const parsedInitToken = decodeLoginToken(parsedBody);
    return new DecodedNativeAuthTokenType(parsedAddress, parsedBody, signature, parsedInitToken!);
  } catch (err) {
    return null;
  }
};
