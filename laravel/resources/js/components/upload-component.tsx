import {
    Dashboard,
    Tus,
    Uppy,
} from 'https://releases.transloadit.com/uppy/v3.15.0/uppy.min.mjs';
import { useEffect } from 'react';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import '@uppy/webcam/css/style.min.css';

export default function UploadComponent() {
    useEffect(() => {
        new Uppy()
            .use(Dashboard, { inline: true, target: '#drag-drop-area' })
            .use(Tus, {
                endpoint: '/tus/upload', // Points to your Laravel route
                chunkSize: 5 * 1024 * 1024, // 5MB chunks
            });
    });

    return <div id="drag-drop-area"></div>;
}
