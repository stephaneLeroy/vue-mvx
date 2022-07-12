import type { PropType } from "vue";
import QRCodeDefaultHandler from "./QRCodeDefaultHandler";
import type IQRCodeHandler from "./IQRCodeHandler";
declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            qrcodeHandler: IQRCodeHandler;
            selectedMode: string;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            selectedMode: {
                type: StringConstructor;
                default: () => string;
            };
            qrcodeHandler: {
                type: PropType<IQRCodeHandler>;
                require: boolean;
                default: () => QRCodeDefaultHandler;
            };
            token: {
                require: boolean;
                type: StringConstructor;
            };
        }>> & {
            onLogin?: ((mode: String) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "qrcodeHandler" | "selectedMode">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: "login", mode: String) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            selectedMode: {
                type: StringConstructor;
                default: () => string;
            };
            qrcodeHandler: {
                type: PropType<IQRCodeHandler>;
                require: boolean;
                default: () => QRCodeDefaultHandler;
            };
            token: {
                require: boolean;
                type: StringConstructor;
            };
        }>> & {
            onLogin?: ((mode: String) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            login: (mode: String) => void;
        }, string, {
            qrcodeHandler: IQRCodeHandler;
            selectedMode: string;
        }> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        selectedMode: {
            type: StringConstructor;
            default: () => string;
        };
        qrcodeHandler: {
            type: PropType<IQRCodeHandler>;
            require: boolean;
            default: () => QRCodeDefaultHandler;
        };
        token: {
            require: boolean;
            type: StringConstructor;
        };
    }>> & {
        onLogin?: ((mode: String) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    selectedMode: {
        type: StringConstructor;
        default: () => string;
    };
    qrcodeHandler: {
        type: PropType<IQRCodeHandler>;
        require: boolean;
        default: () => QRCodeDefaultHandler;
    };
    token: {
        require: boolean;
        type: StringConstructor;
    };
}>> & {
    onLogin?: ((mode: String) => any) | undefined;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    login: (mode: String) => void;
}, string, {
    qrcodeHandler: IQRCodeHandler;
    selectedMode: string;
}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {};
});
export default _default;
