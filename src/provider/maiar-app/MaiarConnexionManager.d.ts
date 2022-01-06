import { WalletConnectProvider } from "@elrondnetwork/erdjs";
import { MaiarAppOption } from "../config";
declare class MaiarConnexionManager {
    private _walletConnect;
    private _heartbeatTimeout;
    private _hearbeatEnabled;
    private _connexionTimeout;
    private _heartbeatDisconnectInterval?;
    private _heartbeatInterval?;
    constructor(walletConnect: WalletConnectProvider, options: MaiarAppOption);
    startConnexionLostDetection(): void;
    heartbeat(): void;
    newConnexionLostInterval(): void;
    isConnected(): boolean | undefined;
}
export default MaiarConnexionManager;
