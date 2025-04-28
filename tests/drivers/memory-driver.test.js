import { describe, it, expect } from 'vitest';
import { MemoryDriver } from '@/drivers/MemoryDriver';

describe('MemoryDriver', () => {
    it('should set and get a value', async () => {
        const driver = new MemoryDriver();
        await driver.set('key', 'value');

        const result = await driver.get('key');
        expect(result).toBe('value');
    });

    it('should return null if key does not exist', async () => {
        const driver = new MemoryDriver();

        const result = await driver.get('nonexistent');
        expect(result).toBeNull();
    });

    it('should delete a key', async () => {
        const driver = new MemoryDriver();
        await driver.set('key', 'value');

        await driver.delete('key');
        const result = await driver.get('key');
        expect(result).toBeNull();
    });

    it('should clear all keys', async () => {
        const driver = new MemoryDriver();
        await driver.set('key1', 'value1');
        await driver.set('key2', 'value2');

        await driver.clear();

        const result1 = await driver.get('key1');
        const result2 = await driver.get('key2');

        expect(result1).toBeNull();
        expect(result2).toBeNull();
    });
});
