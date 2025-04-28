export class LocalStorageDriver {
    async get(key: string): Promise<any | null> {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }

    async set(key: string, value: any): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
    }

    async delete(key: string): Promise<void> {
        localStorage.removeItem(key);
    }

    async clear(): Promise<void> {
        localStorage.clear();
    }
}
