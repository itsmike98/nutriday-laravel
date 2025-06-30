import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/build/' : '/',
    server: {
        host: true,
        strictPort: true,
        cors: true,
        hmr: {
            host: "localhost",
        },
    },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@js": "/resources/js",
            "@css": "/resources/css",
        },
    },
    build: {
        outDir: 'public/build',
    },
}));
