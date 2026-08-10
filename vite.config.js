import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.ts',
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
        hmr: {
            host: '127.0.0.1',
            port: 5173,
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    ssr: {
        noExternal: ['@inertiajs/vue3'],
    },
    build: {
        rollupOptions: {
            output: {
                // Vite already code-splits the async page sections well on its
                // own. What it does not do is separate third-party code from
                // ours, so every copy tweak invalidated the whole ~227KB entry
                // chunk for returning visitors. Pinning the dependencies that
                // only change on upgrade into their own chunks keeps them
                // cached across ordinary deploys.
                // Rolldown (Vite 8) only accepts the function form here.
                manualChunks(id) {
                    if (!id.includes('node_modules')) return;
                    if (id.includes('@inertiajs')) return 'vendor-inertia';
                    if (id.includes('axios')) return 'vendor-http';
                },
            },
        },
    },
});
