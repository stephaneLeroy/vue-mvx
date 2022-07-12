declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        default: string;
    };
    logo: {
        type: StringConstructor;
        default: string;
    };
    selectedMode: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {
    nameToClass: () => string;
}, {
    selectProvider(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "select-mode"[], "select-mode", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    logo: {
        type: StringConstructor;
        default: string;
    };
    selectedMode: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onSelect-mode"?: ((...args: any[]) => any) | undefined;
}, {
    name: string;
    selectedMode: string;
    logo: string;
}>;
export default _default;
