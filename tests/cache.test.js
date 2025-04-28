import { describe, it, expect } from 'vitest';
import { Cache } from '@/Cache';
import { MemoryDriver } from '@/drivers/MemoryDriver';

describe('Cache', () => {
    it('should set and get value', async () => {
        const cache = new Cache(new MemoryDriver());
        await cache.set('key', 'value', 60);

        const result = await cache.get('key');
        expect(result).toBe('value');
    });

    it('should delete value', async () => {
        const cache = new Cache(new MemoryDriver());
        await cache.set('key', 'value', 60);
        await cache.delete('key');

        const result = await cache.get('key');
        expect(result).toBeNull();
    });

    it('should expire value after TTL', async () => {
        const cache = new Cache(new MemoryDriver());
        await cache.set('key', 'value', 1);

        await new Promise((resolve) => setTimeout(resolve, 1100));
        const result = await cache.get('key');
        expect(result).toBeNull();
    });

    it('should use remember callback if key is missing', async () => {
        const cache = new Cache(new MemoryDriver());
        const value = await cache.remember('newKey', 60, async () => 'newValue');

        expect(value).toBe('newValue');

        const cached = await cache.get('newKey');
        expect(cached).toBe('newValue');
    });
});
