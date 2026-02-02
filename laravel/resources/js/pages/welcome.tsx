import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { useContext } from 'react';
import { HomePage, Icons } from '../../../../figma/implementation/src';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const initialIcons = useContext(Icons);
    return (
        <Icons.Provider
            value={{
                ...initialIcons,
                logoutIcon: '/ui/logoutIcon.png',
                fileIcon: '/ui/fileIcon.png',
                deleteIcon: '/ui/deleteIcon.png',
                accessIcon: '/ui/accessIcon.png',
                audioIcon: '/ui/audioIcon.png',
                videoIcon: '/ui/videoIcon.png',
                lockIcon: '/ui/lockIcon.png',
            }}
        >
            <HomePage
                user={auth.user}
                uploader={async (file: File) => {
                    if (file) {
                        console.log('Uploader le fichier', file);
                        const uppy = new Uppy();
                        uppy.addFile(file);

                        uppy.use(Tus, {
                            endpoint: '/api/upload', // Points to your Laravel route
                            chunkSize: 500 * 1024, // 500KB chunks
                            headers: {
                                Authorization: `Bearer ${auth.token}`,
                            },
                        });
                        uppy.on('complete', (result) => {
                            console.log('Upload complete!', result);
                        });
                        uppy.upload().then((result) => {
                            console.log('Upload complete!', result);
                        });
                    }
                }}
            />
        </Icons.Provider>
    );
}
