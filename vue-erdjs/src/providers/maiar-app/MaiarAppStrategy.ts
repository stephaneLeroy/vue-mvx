import {Address, Transaction} from "@elrondnetwork/erdjs";
import {WalletConnectProvider} from '@elrondnetwork/erdjs-wallet-connect-provider';
import MaiarConnexionManager from './MaiarConnexionManager'
import type {MaiarAppOption} from "../config";
import type IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import type IProviderStrategy from "../IProviderStrategy";

export class MaiarAppLoginData {
    qrCodeData: string;
    deeplink: string;

    constructor(qrCodeData: string, deeplink: string) {
        this.deeplink = deeplink;
        this.qrCodeData = qrCodeData;
    }

}

class MaiarAppStrategy implements IProviderStrategy {
    private eventHandler: IProviderStrategyEventHandler;
    private _walletConnectDeepLink: string;
    private _walletConnectBridgeUrl: string;
    private _walletConnect: WalletConnectProvider;
    private _connexionManager: MaiarConnexionManager;

    constructor(eventHandler: IProviderStrategyEventHandler, options: MaiarAppOption) {
        this.eventHandler = eventHandler;
        this._walletConnectDeepLink = options.walletConnectDeepLink;
        this._walletConnectBridgeUrl = options.walletConnectBridgeUrl;

        this._walletConnect = new WalletConnectProvider(
            this._walletConnectBridgeUrl,
            {
                onClientLogin: () => this.handleOnClientLogin(),
                onClientLogout: () => this.handleOnClientLogout(),
            }
        );

        if (!this._walletConnect.isInitialized()) {
            this._walletConnect.init();
        }
        this._connexionManager = new MaiarConnexionManager(this._walletConnect, options);
    }

    id() {
        return "maiar-app";
    }

    name() {
        return "Maiar App";
    }

    handleOnClientLogin() {
        return this._walletConnect
            .getAddress()
            .then((address) => {
                return this._walletConnect.getSignature().then((signature: string) => {
                    this.eventHandler.handleLogin(this, new Address(address), signature);
                    this._connexionManager.startConnexionLostDetection();
                })
            })
            .catch((err) => {
                this.eventHandler.handleLoginError(this, err);
            });
    }

    handleOnClientLogout() {
        console.log("logout requested")
        this.eventHandler.handleLogout(this);
    }

    login(options?: { addressIndex?: number, callbackUrl?: string, token?: string }): Promise<MaiarAppLoginData | undefined> {
        return this._walletConnect.login().then((walletConnectUri) => {
            if (walletConnectUri) {
                if (options && options.token) {
                    const walletConectUriWithToken = `${walletConnectUri}&token=${options.token}`;
                    return new MaiarAppLoginData(walletConectUriWithToken, this.deeplink(walletConectUriWithToken))
                }
                return new MaiarAppLoginData(walletConnectUri, this.deeplink(walletConnectUri))
            }
        });
    }

    load() {
        if (this._connexionManager.isConnected()) {
            return this.handleOnClientLogin();
        }
        return this.handleOnClientLogout;
    }

    provider() {
        return this._walletConnect;
    }

    logout() {
        this._walletConnect.logout();
    }

    get walletConnectBridgeUrl() {
        return this._walletConnectBridgeUrl;
    }

    deeplink(url: string) {
        return `${this._walletConnectDeepLink}?wallet-connect=${encodeURIComponent(url)}`;
    }

    signTransaction(transaction: Transaction, options?: { callbackUrl?: string }): Promise<Transaction | void> {
        return this.provider().signTransaction(transaction)
    }
    signTransactions(transaction: Transaction[], options?: { callbackUrl?: string }): Promise<Transaction[] | void> {
        return this.provider().signTransactions(transaction)
    }

}

export default MaiarAppStrategy;
