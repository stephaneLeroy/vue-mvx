import { IDappProvider } from "@elrondnetwork/erdjs";
interface IProviderStrategy {
    name(): string;
    login(options?: {
        addressIndex?: number;
        callbackUrl?: string;
    }): Promise<any>;
    logout(): void;
    load(): void;
    provider(): IDappProvider;
}
export default IProviderStrategy;
