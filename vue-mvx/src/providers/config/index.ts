class MaiarAppOption {
    walletConnectV2Relay: string | undefined;
    walletConnectV2ProjectId: string | undefined;
    walletConnectDeepLink: string = "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/";

    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class LedgerOption {
    useFirstIndex: boolean = false;

    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class WebWalletOption {
    url: string = "https://devnet-wallet.elrond.com"

    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class DefiWalletOption {
    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class ApiOption {
    url: string = "https://devnet-api.multiversx.com";
    timeout: number = 2000;

    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class ProxyOption {
    url: string = "https://devnet-gateway.multiversx.com";
    timeout: number = 2000;

    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class ToolsOption {
    url: string = "https://devnet-tools.multiversx.com/";

    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class ExplorerOption {
    url: string = "https://devnet-explorer.multiversx.com";

    constructor(options?: JSON) {
        options && Object.assign(this, options);
    }
}

class ProviderOption {
    maiar: MaiarAppOption = new MaiarAppOption();
    ledger: LedgerOption = new LedgerOption();
    webWallet: WebWalletOption = new WebWalletOption();
    defiWallet: DefiWalletOption = new DefiWalletOption();
    api: ApiOption = new ApiOption();
    proxy: ProxyOption = new ProxyOption();
    explorer: ExplorerOption = new ExplorerOption();
    tools: ToolsOption = new ToolsOption();

    constructor(walletConnectV2ProjectId: string, options?: Object) {
        options && Object.assign(this, options);
        this.maiar.walletConnectV2ProjectId = walletConnectV2ProjectId;
    }

}

enum ElrondEnvEnum {
    DEVNET,
    TESTNET,
    MAINNET
}

import devnet from './devnet-config.json';
import testnet from './testnet-config.json';
import mainnet from './mainnet-config.json';

export {
    ProviderOption,
    MaiarAppOption,
    LedgerOption,
    WebWalletOption,
    DefiWalletOption,
    ProxyOption,
    ApiOption,
    ExplorerOption,
    ToolsOption,
    ElrondEnvEnum
};
export default (env: ElrondEnvEnum, walletConnectV2ProjectId: string) => {
    switch (env) {
        case ElrondEnvEnum.MAINNET:
            return new ProviderOption(walletConnectV2ProjectId, mainnet);
        case ElrondEnvEnum.TESTNET:
            return new ProviderOption(walletConnectV2ProjectId, testnet);
        case ElrondEnvEnum.DEVNET:
        default:
            return new ProviderOption(walletConnectV2ProjectId, devnet);
    }
}
