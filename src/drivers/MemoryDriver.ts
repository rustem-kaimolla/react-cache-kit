export class MemoryDriver {
    private store: Record<string, any> = {};

    async get(key: string): Promise<any | null> {
        return this.store[key] ?? null;
    }

    async set(key: string, value: any): Promise<void> {
        this.store[key] = value;
    }

    async delete(key: string): Promise<void> {
        delete this.store[key];
    }

    async clear(): Promise<void> {
        this.store = {};
    }
}
