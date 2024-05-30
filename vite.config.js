// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

// @see https://vitejs.dev/config/

export default defineConfig({
    build: {
        minify: true,
        outDir: "../dist/",
        cssCodeSplit: false,
        manifest: true,

        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                nested: resolve(__dirname, 'src/views/index.html'),
                offerV1: resolve(__dirname, 'src/views/offer-v1.html'),
                offerV2: resolve(__dirname, 'src/views/offer-v2.html'),
            },
        },
    },

    root: "src/",

    css: {
        devSourcemap: true,
    },

    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/views/block'),
        }),
    ],
})
