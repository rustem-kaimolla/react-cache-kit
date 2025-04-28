export class SessionStorageDriver {
    async get(key: string): Promise<any | null> {
        const raw = sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }

    async set(key: string, value: any): Promise<void> {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    async delete(key: string): Promise<void> {
        sessionStorage.removeItem(key);
    }

    async clear(): Promise<void> {
        sessionStorage.clear();
    }
}
