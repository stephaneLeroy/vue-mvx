import {detectCurrentPlatform, PlatformsEnum} from "@/providers/xportal-hub/native-auth/detectCurrentPlatform";
import {Transaction} from "@multiversx/sdk-core/out";
import {requestMethods, WebViewProviderResponseEnums} from "@/providers/xportal-hub/requestMethods";

const currentPlatform = detectCurrentPlatform();
export const targetOrigin =
    typeof window != 'undefined' ? window?.parent?.origin ?? '*' : '*';

const handleWaitForMessage = (cb: (eventData: any) => void) => {
    const handleMessageReceived = (event: any) => {
        let eventData = event.data;
        if (
            event.target.origin != targetOrigin &&
            currentPlatform != PlatformsEnum.reactNative
        ) {
            return;
        }
        try {
            eventData = JSON.parse(eventData);
            cb(eventData);
        } catch (err) {
            console.error('error parsing response');
        }
    };
    document.addEventListener('message', handleMessageReceived);
    window.addEventListener('message', handleMessageReceived);
};

export class XPortalHubProvider {

    //relogin is called instead of logout if the user is not actively requiring to be logged out
    //for example, when the token expires, and this will regenerate the token, for a seamless experience
    async relogin() {
        try {
            requestMethods.login[currentPlatform]();
            const waitForNewToken: Promise<string> = new Promise(
                (resolve, reject) => {
                    function handleTokenReceived(eventData: any) {
                        const { message, type } = eventData;
                        if (type === WebViewProviderResponseEnums.loginResponse) {
                            try {
                                const { accessToken, error } = message;
                                if (!error) {
                                    resolve(accessToken);
                                } else {
                                    reject(error);
                                }
                            } catch (err) {
                                reject('Unable to login');
                            }
                        }
                        document.removeEventListener('message', handleTokenReceived);
                    }
                    handleWaitForMessage(handleTokenReceived);
                }
            );
            return await waitForNewToken;
        } catch (err) {
            console.error('error logging in', err);
            throw err;
        }
    }
    logout() {
        requestMethods.logout[currentPlatform]();
        return new Promise((resolve) => {
            resolve(true);
        });
    }
    signMessage(caller: string) {
        throw new Error(`Cannot sign ${caller} message from xportal yet`);
    }
    async signTransactions(transactions: Transaction[]) {
        try {
            const plainTransactions = transactions.map((tx) => tx.toPlainObject());
            requestMethods.signTransactions[currentPlatform](plainTransactions);
            const waitForSignedTransactionsResponse: Promise<Transaction[]> =
                new Promise((resolve, reject) => {
                    (window as any).transactionsSigned = (txs: any, error: string) => {
                        txs = JSON.parse(txs);
                        if (error) {
                            reject(error);
                            (window as any).transactionsSigned = null;
                            return;
                        }
                        resolve(txs.map((tx: any) => Transaction.fromPlainObject(tx)));
                        (window as any).transactionsSigned = null;
                    };

                    function handleSignResponse(eventData: any) {
                        const { message, type } = eventData;
                        if (
                            type === WebViewProviderResponseEnums.signTransactionsResponse
                        ) {
                            const { transactions, error } = message;

                            try {
                                if (!error) {
                                    resolve(
                                        transactions.map((tx: any) =>
                                            Transaction.fromPlainObject(tx)
                                        )
                                    );
                                } else {
                                    reject(error);
                                }
                            } catch (err) {
                                reject('Unable to sign');
                            }
                        }
                        document.removeEventListener('message', handleSignResponse);
                    }
                    handleWaitForMessage(handleSignResponse);
                });
            return await waitForSignedTransactionsResponse;
        } catch (err) {
            console.error('error sending transaction', err);
            throw err;
        }
    }
    async signTransaction(transaction: Transaction) {
        const response = await this.signTransactions([transaction]);
        return response[0];
    }
}
