import { ExtensionProvider } from '@elrondnetwork/erdjs-extension-provider';
import { HWProvider } from '@elrondnetwork/erdjs-hw-provider';
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { WalletProvider } from '@elrondnetwork/erdjs-web-wallet-provider';
import {IDappProvider} from "./IDappProvider";

type ProvidersType =
    | IDappProvider
    | ExtensionProvider
    | WalletProvider
    | HWProvider
    | WalletConnectProvider;

interface IProviderStrategy {
  id(): string;
  name(): string;
  login(options?: { addressIndex?: number, callbackUrl?: string, token?: string }): Promise<any>;
  logout(): void;
  load(): void;
  provider(): ProvidersType;
  onUrl?(url: Location): void;
}

export default IProviderStrategy;
