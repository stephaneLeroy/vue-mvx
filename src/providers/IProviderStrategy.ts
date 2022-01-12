import {IDappProvider} from "@elrondnetwork/erdjs";

interface IProviderStrategy {
  id(): string;
  name(): string;
  login(options?: { addressIndex?: number, callbackUrl?: string, token?: string }): Promise<any>;
  logout(): void;
  load(): void;
  provider(): IDappProvider;
  onUrl?(url: Location): void;
}

export default IProviderStrategy;
