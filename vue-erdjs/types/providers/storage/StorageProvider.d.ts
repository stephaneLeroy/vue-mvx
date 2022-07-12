import dayjs from 'dayjs';
declare class StorageProvider {
    private _key;
    constructor(key: string);
    get(): any;
    set(data: any, expire?: dayjs.Dayjs): void;
    clear(): void;
}
export default StorageProvider;
