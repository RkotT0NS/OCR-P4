import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        svgr({
            include: '**/*.svg',
            svgrOptions: {
                exportType: 'default',
                ref: true,
            },
        }),
    ],
    // esbuild: false,
    // esbuild: {
    //     jsx: 'automatic',
    // },
    build: { sourcemap: true },
    oxc: false,
    server: {
        // The Proxy Configuration
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000', // The Laravel Server
                changeOrigin: true,
                secure: false,
                // Optional: rewrite path if needed, but standard Laravel uses /api prefix
            },
        },
    },
});
