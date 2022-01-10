class MaiarAppOption {
  walletConnectBridgeUrl: string = "https://bridge.walletconnect.org";
  walletConnectDeepLink: string = "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/";
  connexionTimeout: number = 30000;
  heartbeatInterval: number = 5000;
  heartbeatEnabled: boolean = false;

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
  url: string = "https://devnet-api.elrond.com";
  timeout: number = 2000;

  constructor(options?: JSON) {
    options && Object.assign(this, options);
  }
}

class ProxyOption {
  url: string = "https://devnet-gateway.elrond.com";
  timeout: number = 2000;

  constructor(options?: JSON) {
    options && Object.assign(this, options);
  }
}

class ExplorerOption {
  url: string = "https://devnet-explorer.elrond.com";

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

  constructor(options?: JSON) {
    options && Object.assign(this, options);
  }

}

export { ProviderOption, MaiarAppOption, LedgerOption, WebWalletOption, DefiWalletOption, ProxyOption, ApiOption, ExplorerOption };
