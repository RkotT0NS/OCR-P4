import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

import { useContext } from 'react';
import { HomePage, Icons } from '../../../../figma/implementation/src';

import { usePageUpload } from '@datashare/upload';

export default function Welcome() {
    const { auth, uploadSizeLimit } = usePage<
        SharedData & { uploadSizeLimit: number }
    >().props;
    const {
        uploadedFileUrl,
        progress,
        isPaused,
        isUploading,
        handleUpload,
        onPause,
        onResume,
    } = usePageUpload(auth.token);
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
                uploadedFileUrl={uploadedFileUrl}
                uploader={handleUpload}
                progress={progress}
                isPaused={isPaused}
                isUploading={isUploading}
                {...{ onPause, onResume }}
                uploadSizeLimit={uploadSizeLimit}
            />
        </Icons.Provider>
    );
}
