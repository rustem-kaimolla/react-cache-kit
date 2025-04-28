import { defineConfig } from 'vite';
import * as path from 'path';

import { configDefaults } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ReactCacheKit',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['react'],
            output: {
                exports: 'named',
                globals: {
                    react: 'React'
                }
            }
        }
    }
});
