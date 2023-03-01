import {Address, TransactionVersion, Transaction, TransactionOptions, TransactionPayload} from "@multiversx/sdk-core";
import {WalletProvider} from '@multiversx/sdk-web-wallet-provider';
import type IProviderStrategy from "../IProviderStrategy";
import type IProviderStrategyEventHandler from "../IProviderStrategyEventHandler";
import type {WebWalletOption} from "../config";
import StorageProvider from "../storage/StorageProvider";
import dayjs from "dayjs";
import {isStringBase64} from "./base64Utils";

class WebWalletProviderStrategy implements IProviderStrategy {
    private _eventHandler: IProviderStrategyEventHandler;
    private _webWallet: WalletProvider;
    private _lastStatus?: string;
    private _storage = new StorageProvider('web-wallet-strategy');
    private _timeoutInMinutes = 30;

    constructor(eventHandler: IProviderStrategyEventHandler, options: WebWalletOption) {
        this._eventHandler = eventHandler;
        this._webWallet = new WalletProvider(`${options.url}/init`);
        this._lastStatus = undefined;
    }

    id() {
        return "web-wallet";
    }

    name() {
        return "Web Wallet";
    }

    provider() {
        return this._webWallet;
    }

    callbackReceived(url: Location) {
        const urlSearchParams = new URLSearchParams(url.search);

        const address = urlSearchParams.get('address');
        const token = urlSearchParams.get('signature');
        if (address) {
            this._storage.set({ wallet: address, token: token  } , dayjs().add(this._timeoutInMinutes, 'minute'))
            this._eventHandler.handleLogin(this, new Address(address), token ? token : undefined)
        }

        const status = urlSearchParams.get('status');
        if (status) {
            this._lastStatus = status;
        } else {
            this._lastStatus = undefined;
        }
    }

    get lastStatus() {
        return this._lastStatus;
    }

    login(options?: { addressIndex?: number, callbackUrl?: string, token?: string }): Promise<any> {
        this._eventHandler.handleLogin(this);
        return this._webWallet.login(options);
    }

    logout() {
        this._storage.clear();
        this._webWallet.logout();
    }

    load() {
        let stored = this._storage.get();
        if (stored) {
            this._eventHandler.handleLogin(this, new Address(stored.wallet), stored.token);
            this.onUrl(window.location)
        } else {
            this.callbackReceived(window.location)
        }
    }

    onUrl(url: Location) {
        const transactions = this._webWallet.getTransactionsFromWalletUrl();
        console.log("On Url", url, transactions)
        if(!transactions || transactions.length <= 0) {
            return
        }

        transactions.forEach((rawTransaction) => {

            const { data } = rawTransaction;
            const dataPayload = isStringBase64(data ?? '')
                ? TransactionPayload.fromEncoded(data)
                : new TransactionPayload(data);

            const transaction = new Transaction({
                value: rawTransaction.value.valueOf(),
                data: dataPayload,
                nonce: rawTransaction.nonce.valueOf(),
                receiver: new Address(rawTransaction.receiver),
                sender: new Address(rawTransaction.sender),
                gasLimit: rawTransaction.gasLimit.valueOf(),
                gasPrice: rawTransaction.gasPrice.valueOf(),
                chainID: rawTransaction.chainID.valueOf(),
                version: new TransactionVersion(rawTransaction.version),
                ...(rawTransaction.options
                    ? { options: new TransactionOptions(rawTransaction.options) }
                    : {})
            });

            transaction.applySignature(
                {
                    hex: () => rawTransaction.signature || ''
                },
                new Address(rawTransaction.sender)
            );
            this._eventHandler.handleTransaction(transaction);

        })
    }

    signTransaction(transaction: Transaction, options?: { callbackUrl?: string }): Promise<Transaction | void> {
        return this.provider().signTransaction(transaction, options);
    }
    signTransactions(transaction: Transaction[], options?: { callbackUrl?: string }): Promise<Transaction[] | void> {
        return this.provider().signTransactions(transaction)
    }
}

export default WebWalletProviderStrategy;
