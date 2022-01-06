import { ApiProvider, ProxyProvider } from "@elrondnetwork/erdjs";
import { ProviderOption } from "./provider/config";
declare const _default: {
    isLogged(): boolean;
    erdProxy(): ProxyProvider;
    erdApi(): ApiProvider;
    install(Vue: any, options: ProviderOption): void;
};
export default _default;
