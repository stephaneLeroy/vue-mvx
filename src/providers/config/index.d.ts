declare class MaiarAppOption {
    walletConnectBridgeUrl: string;
    walletConnectDeepLink: string;
    connexionTimeout: number;
    heartbeatInterval: number;
    heartbeatEnabled: boolean;
    constructor(options?: JSON);
}
declare class LedgerOption {
    useFirstIndex: boolean;
    constructor(options?: JSON);
}
declare class WebWalletOption {
    url: string;
    constructor(options?: JSON);
}
declare class DefiWalletOption {
    constructor(options?: JSON);
}
declare class ApiOption {
    url: string;
    timeout: number;
    constructor(options?: JSON);
}
declare class ProxyOption {
    url: string;
    timeout: number;
    constructor(options?: JSON);
}
declare class ExplorerOption {
    url: string;
    constructor(options?: JSON);
}
declare class ProviderOption {
    maiar: MaiarAppOption;
    ledger: LedgerOption;
    webWallet: WebWalletOption;
    defiWallet: DefiWalletOption;
    api: ApiOption;
    proxy: ProxyOption;
    explorer: ExplorerOption;
    constructor(options?: JSON);
}
export { ProviderOption, MaiarAppOption, LedgerOption, WebWalletOption, DefiWalletOption, ProxyOption, ApiOption, ExplorerOption };
