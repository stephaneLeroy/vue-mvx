import IProviderStrategy from "./IProviderStrategy";
import {Address} from "@elrondnetwork/erdjs";
import {Transaction} from "@elrondnetwork/erdjs";

interface IProviderStrategyEventHandler {

  handleLogin(provider: IProviderStrategy, address: Address, token?: string): void;
  handleLoginStart(provider: IProviderStrategy): void;
  handleLoginError(provider: IProviderStrategy, err: Error): void;
  handleLogout(provider: IProviderStrategy): void;
  handleTransaction(transaction: Transaction): void;

}

export default IProviderStrategyEventHandler
