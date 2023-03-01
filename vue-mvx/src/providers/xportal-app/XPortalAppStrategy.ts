import {Address, Transaction} from "@multiversx/sdk-core";
import {WalletConnectV2Provider} from '@multiversx/sdk-wallet-connect-provider';
import type {MaiarAppOption} from "../config";
import type IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import type IProviderStrategy from "../IProviderStrategy";
import type {SessionEventTypes} from "@multiversx/sdk-wallet-connect-provider/out/walletConnectV2Provider";

export class XPortalAppLoginData {
    qrCodeData: string;
    deeplink: string;

    constructor(qrCodeData: string, deeplink: string) {
        this.deeplink = deeplink;
        this.qrCodeData = qrCodeData;
    }

}

class XPortalAppStrategy implements IProviderStrategy {
    private eventHandler: IProviderStrategyEventHandler;
    private readonly _walletConnectDeepLink: string;
    private readonly _walletConnect: WalletConnectV2Provider;
    private readonly walletConnectV2Relay: string;
    private readonly walletConnectV2ProjectId: string;

    constructor(eventHandler: IProviderStrategyEventHandler, options: MaiarAppOption, chainId: string) {
        this.eventHandler = eventHandler;
        this._walletConnectDeepLink = options.walletConnectDeepLink;
        if(!options.walletConnectV2Relay || !options.walletConnectV2ProjectId) {
            throw new Error("walletConnectV2Relay and walletConnectV2ProjectId are required");
        }
        this.walletConnectV2Relay = options.walletConnectV2Relay;
        this.walletConnectV2ProjectId = options.walletConnectV2ProjectId;

        this._walletConnect = new WalletConnectV2Provider(
            {
                onClientLogin: () => {
                    return this.handleOnClientLogin()
                },
                onClientLogout: () => {
                    return this.handleOnClientLogout()
                },
                onClientEvent: (event: SessionEventTypes["event"]) => {
                    console.log("WalletConnect event", event)
                }
            },
            chainId,
            this.walletConnectV2Relay,
            this.walletConnectV2ProjectId
        );
    }

    id() {
        return "xportal-app";
    }

    name() {
        return "xPortal App";
    }

    handleOnClientLogin() {
        return this._walletConnect
            .getAddress()
            .then((address) => {
                return this._walletConnect.getSignature().then((signature: string) => {
                    this.eventHandler.handleLogin(this, new Address(address), signature);
                    //this._connexionManager.startConnexionLostDetection();
                })
            })
            .catch((err) => {
                this.eventHandler.handleLoginError(this, err);
            });
    }

    handleOnClientLogout() {
        this.eventHandler.handleLogout(this);
    }

    async login(options?: { token?: string }): Promise<XPortalAppLoginData | undefined> {
        await this._walletConnect.init();
        const { uri, approval } = await this._walletConnect.connect();
        if(!uri) {
            return undefined;
        }
        let walletConectUriWithToken = uri;
        if (options && options.token) {
            walletConectUriWithToken = `${walletConectUriWithToken}&token=${options.token}`;
        }
        this._walletConnect.login({ approval, token: options?.token });
        return new XPortalAppLoginData(walletConectUriWithToken, this.deeplink(walletConectUriWithToken))
    }

    async load() {
        await this._walletConnect.init();
        if (!await this.isConnected()) {
            return this.handleOnClientLogout;
        }
    }

    async isConnected() {
        return this._walletConnect &&
            await this._walletConnect.isConnected();
    }

    provider() {
        return this._walletConnect;
    }

    logout() {
        this._walletConnect.logout();
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

export default XPortalAppStrategy;
