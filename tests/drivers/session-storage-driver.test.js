import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SessionStorageDriver } from '@/drivers/SessionStorageDriver';

describe('SessionStorageDriver', () => {
    let driver;

    beforeEach(() => {
        driver = new SessionStorageDriver();
        sessionStorage.clear();
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    it('should set and get a value', async () => {
        await driver.set('key', 'value');
        const result = await driver.get('key');
        expect(result).toBe('value');
    });

    it('should return null for non-existing key', async () => {
        const result = await driver.get('nonexistent');
        expect(result).toBeNull();
    });

    it('should delete a key', async () => {
        await driver.set('key', 'value');
        await driver.delete('key');
        const result = await driver.get('key');
        expect(result).toBeNull();
    });

    it('should clear all keys', async () => {
        await driver.set('key1', 'value1');
        await driver.set('key2', 'value2');
        await driver.clear();

        expect(await driver.get('key1')).toBeNull();
        expect(await driver.get('key2')).toBeNull();
    });
});
