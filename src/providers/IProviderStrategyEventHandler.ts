import type IProviderStrategy from "./IProviderStrategy";
import type {Address} from "@elrondnetwork/erdjs";

interface IProviderStrategyEventHandler {

    handleLogin(provider: IProviderStrategy, address: Address, token?: string): void;

    handleLoginStart(provider: IProviderStrategy): void;

    handleLoginError(provider: IProviderStrategy, err: Error): void;

    handleLogout(provider: IProviderStrategy): void;

    handleTransaction(transaction: { status: string, txHash: string }): void;

}

export default IProviderStrategyEventHandler
