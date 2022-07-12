import QRCodeDefaultHandler from "./maiar/QRCodeDefaultHandler";
declare const _default: import("vue").DefineComponent<{
    qrcodeHandler: {
        require: boolean;
        default: () => QRCodeDefaultHandler;
    };
    token: {
        require: boolean;
        type: StringConstructor;
    };
}, unknown, {
    selectedMode: string;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    qrcodeHandler: {
        require: boolean;
        default: () => QRCodeDefaultHandler;
    };
    token: {
        require: boolean;
        type: StringConstructor;
    };
}>>, {
    qrcodeHandler: QRCodeDefaultHandler;
}>;
export default _default;
