export interface IQRCodeHandler {
    handle(data: string, element: HTMLElement): Promise<any>
}
