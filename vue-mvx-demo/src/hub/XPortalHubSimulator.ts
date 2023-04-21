import { UserSigner } from "@multiversx/sdk-wallet";
import { Transaction } from "@multiversx/sdk-core";
import {Signature} from "@multiversx/sdk-wallet/out/signature";

let listenerAdded = false;
const useXportalHub = async () => {
    if(listenerAdded) return;

    const headers = new Headers();
    headers.append('Content-Type','text/plain; charset=UTF-8');
    const walletPem = await fetch("/wallet.pem", { headers });
    const walletPemText = await walletPem.text();
    console.log("walletPem", walletPemText);
    let signer = UserSigner.fromPem(walletPemText);

    window.addEventListener("message", async (event) => {
        if(!event.data) return;

        try {
            const eventData = JSON.parse(event.data);
            if(!eventData?.type || eventData.type !== 'SIGN_TRANSACTIONS_REQUEST') {
                return;
            }
            const transactions = [];
            for(let i = 0; i < eventData.message.length; i++) {
                const transaction = Transaction.fromPlainObject(eventData.message[i]);
                const serializedTransaction = transaction.serializeForSigning(transaction.getSender());
                const transactionSignature = await signer.sign(serializedTransaction);
                transaction.applySignature(new Signature(transactionSignature), transaction.getSender());
                transactions.push(transaction.toPlainObject());
            }
            console.log("Sending message to xPortal Hub", transactions)
            window.postMessage(JSON.stringify({
                type: 'SIGN_TRANSACTIONS_RESPONSE',
                message: { transactions }
            }))
        } catch(err) {
            //Silent catch JSON parse error
            //console.log("Error parsing message from xPortal Hub", err)
        }
    });
    listenerAdded = true;
}
export default useXportalHub;