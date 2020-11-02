export type ChangeEvent<T = any> = (value: T, thisArg: State) => void;
export interface StorageItems {
    [key: string]: any;
}

export class State {
    protected storage: Storage = localStorage;
    protected key = 'libraria.io-state';
    protected listeners: { [key: string]: Array<ChangeEvent> } = {};

    getStorage() {
        return this.storage;
    }

    getKey() {
        return this.key;
    }

    has(key: string) {
        return key in this.getAll();
    }

    protected getAll(): StorageItems {
        const data = this.storage.getItem(this.key);
        if (!data) {
            return {};
        }
        try {
            return JSON.parse(data);
        } catch (error) {
            return {};
        }
    }

    protected setAll(data: StorageItems) {
        this.storage.setItem(this.key, JSON.stringify(data));
        return this;
    }

    get<T = any>(key: string): T {
        if (!this.has(key)) {
            throw new Error(`${key} does not exist.`);
        }
        return this.getAll()[key];
    }

    set(key: string, value: any) {
        const data = this.getAll();
        data[key] = value;
        this.dispatch(key, value);
        return this.setAll(data);
    }

    listen<T = any>(key: string, callback: ChangeEvent<T>) {
        if (!(key in this.listeners)) {
            this.listeners[key] = [];
        }
        return this.listeners[key].push(callback) - 1;
    }

    remove(key: string) {
        if(this.has(key)) {
            const data = this.getAll();
            delete data[key];
            this.dispatch(key, null);
            this.setAll(data);
        }
    }

    removeListener(key: string, index: number) {
        if(key in this.listeners) {
            this.listeners[key].splice(index, 1);
        }
        return this;
    }

    protected dispatch(key: string, value: any) {
        if (!(key in this.listeners)) {
            return;
        }
        for (const callback of this.listeners[key]) {
            callback(value, this);
        }
    }
}

const state = new State();

(window as any).state = state;

export default state;