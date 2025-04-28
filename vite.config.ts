import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
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
