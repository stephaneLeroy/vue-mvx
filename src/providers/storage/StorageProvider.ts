import dayjs from 'dayjs';

class StorageProvider {
    private _key: string;

    constructor(key: string) {
        this._key = key;
    }

    get() {
        let item = localStorage.getItem(this._key);
        if(!item) {
            return;
        }

        let stored = JSON.parse(item);
        if(stored.expire == 0 || dayjs().isBefore(dayjs(stored.expire))) {
            return stored.data;
        }
        this.clear();
        return;
    }

    set(data: any, expire?: dayjs.Dayjs) {
        localStorage.setItem(this._key, JSON.stringify({
            data: data,
            expire: expire ? expire.valueOf() : 0
        }));
    }

    clear() {
        localStorage.removeItem(this._key);
    }
}

export default StorageProvider;
