import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import 'material-icons/iconfont/material-icons.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

//favicon
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "/favicon.ico";
document.head.appendChild(favicon);


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
