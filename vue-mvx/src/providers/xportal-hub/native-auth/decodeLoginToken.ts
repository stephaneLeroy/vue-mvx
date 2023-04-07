import { decodeBase64 } from './base64Utils';
import isString from "./isString";

export class DecodedLoginTokenType {
    blockHash: string;
    extraInfo?: { timestamp: number };
    origin: string;
    ttl: number;

    constructor(blockHash: string, origin: string, ttl: number, extraInfo?: { timestamp: number }) {
        this.blockHash = blockHash;
        this.extraInfo = extraInfo;
        this.origin = origin;
        this.ttl = ttl;
    }

    getExpiration(): number {
        const unixNow = Date.now() / 1000;
        const timestamp = this.extraInfo?.timestamp;
        if (!timestamp) {
            return 0;
        }
        const expiresAt = timestamp + this.ttl;
        if(unixNow > expiresAt) {
            return 0
        }
        return expiresAt - unixNow;
    }
}

export const decodeLoginToken = (
  loginToken: string
): DecodedLoginTokenType | null => {
    if (!loginToken || !isString(loginToken)) {
        return null;
    }

    const parts = loginToken.split('.');
    if (parts.length !== 4) {
        console.error(
          'Invalid loginToken. You may be trying to decode a nativeAuthToken. Try using decodeNativeAuthToken method instead'
        );
        return null;
    }

    try {
        const [origin, blockHash, ttl, extraInfo] = parts;
        const parsedExtraInfo = JSON.parse(decodeBase64(extraInfo));
        const parsedOrigin = decodeBase64(origin);
        return new DecodedLoginTokenType(blockHash, parsedOrigin, Number(ttl), parsedExtraInfo);
    } catch (e) {
        console.error(`Error trying to decode ${loginToken}:`, e);
    }
    return null;
};
