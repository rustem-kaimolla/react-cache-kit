import { MemoryDriver } from './drivers/MemoryDriver';

interface CacheOptions {
    ttl?: number;
}

interface CacheItem<T = any> {
    value: T;
    expiresAt: number | null;
}

export class Cache {
    private driver: any;

    constructor(driver = new MemoryDriver()) {
        this.driver = driver;
    }

    async get<T = any>(key: string): Promise<T | null> {
        const item = await this.driver.get(key) as CacheItem<T> | null;
        if (!item) return null;

        if (item.expiresAt && item.expiresAt < Date.now()) {
            await this.driver.delete(key);
            return null;
        }

        return item.value;
    }

    async set<T = any>(key: string, value: T, ttl?: number): Promise<void> {
        const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
        await this.driver.set(key, { value, expiresAt });
    }

    async remember<T = any>(key: string, ttl: number, callback: () => Promise<T>): Promise<T> {
        const cached = await this.get<T>(key);
        if (cached !== null) return cached;

        const value = await callback();
        await this.set(key, value, ttl);
        return value;
    }

    async delete(key: string): Promise<void> {
        await this.driver.delete(key);
    }

    async clear(): Promise<void> {
        await this.driver.clear();
    }
}
