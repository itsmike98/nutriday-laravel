import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: '/',
    server: {
        host: true,
        strictPort: true,
        cors: true,
        hmr: {
          protocol: "ws",
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
});
