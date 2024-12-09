import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

const root = process.cwd();

export default defineConfig({
    root,
    base: '/',
    css: {
      preprocessorOptions: {
        postcss: {
          plugins: [
              autoprefixer(),
          ],
        },
      },
    },
    resolve: {
        alias: {
            '@': resolve(root, './'),
        },
    },
});
