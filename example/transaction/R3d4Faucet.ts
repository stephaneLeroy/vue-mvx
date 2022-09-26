export class R3d4Faucet {

    async claimEgld(amount: string, erdAddress: string) {
        const requestPayload = {
            formdata: {
                amount,
                network: 'D',
                token: '2',
                address: erdAddress
            }
        }

        return await fetch('https://api.r3d4.fr/faucet/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
        })
    }
}
