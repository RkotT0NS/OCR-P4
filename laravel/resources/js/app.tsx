import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function generateFontUrl(name: string, size: number[]): string {
    // return `family=${name}:wght@0,100;0,300;0,700;0,900`; //&amp;family=Inter:wght@0,100..900;1,100..900`; //${size.join(';')}`;
    return `family=${name}:ital,wght@0,100..900;1,100..900&subset=latin`;
    //&amp;family=Inter:wght@0,100..900;1,100..900`; //${size.join(';')}`;
    // return `family=${name}:wght@1,100..900`; //${size.join(';')}`;
}
createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href={`https://fonts.googleapis.com/css?${generateFontUrl('DM Sans', [100, 300, 700])}`}
                    rel="stylesheet"
                />
                <link
                    href={`https://fonts.googleapis.com/css?${generateFontUrl('Inter', [100, 300, 700])}`}
                    rel="stylesheet"
                />
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
