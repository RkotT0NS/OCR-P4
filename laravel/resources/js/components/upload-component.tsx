import {
    Dashboard,
    Tus,
    Uppy,
} from 'https://releases.transloadit.com/uppy/v3.15.0/uppy.min.mjs';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import '@uppy/webcam/css/style.min.css';

export default function UploadComponent() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        const uppy = new Uppy()
            .use(Dashboard, { inline: true, target: '#drag-drop-area' })
            .use(Tus, {
                endpoint: '/api/upload', // Points to your Laravel route
                chunkSize: 5 * 1024 * 1024, // 5MB chunks
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
        
        return () => {
            uppy.close();
        };
    }, [auth.token]);

    return <div id="drag-drop-area"></div>;
}
