import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { useContext, useEffect, useRef, useState } from 'react';
import { HomePage, Icons } from '../../../../figma/implementation/src';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const initialIcons = useContext(Icons);

    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const pendingOptions = useRef<{
        password?: string;
        expiresAt?: number;
    } | null>(null);

    const [uppy] = useState(
        () =>
            new Uppy({
                autoProceed: false,
                restrictions: { maxNumberOfFiles: 1 },
            }),
    );

    useEffect(() => {
        if (!uppy.getPlugin('Tus')) {
            uppy.use(Tus, {
                id: 'Tus',
                endpoint: '/api/upload',
                chunkSize: 5000 * 1024,
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
        }

        const onProgress = (progress: number) => {
            setProgress(progress);
        };

        const onSuccess = (file: any, response: any) => {
            const uploadUrl = response.uploadURL;
            const uuid = uploadUrl.split('/').pop();

            if (
                pendingOptions.current &&
                (pendingOptions.current.password ||
                    pendingOptions.current.expiresAt)
            ) {
                const { password, expiresAt } = pendingOptions.current;
                const payload: any = {};
                if (password && password.trim() !== '') {
                    payload.password = password;
                }
                if (expiresAt) {
                    const date = new Date();
                    date.setDate(date.getDate() + expiresAt);
                    payload.expires_at = date.toISOString();
                }

                if (Object.keys(payload).length > 0) {
                    fetch(`/api/uploads/${uuid}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.token}`,
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        body: JSON.stringify(payload),
                    })
                        .then((res) => {
                            if (!res.ok) {
                                console.error(
                                    'Failed to patch upload metadata',
                                );
                            }
                        })
                        .catch((err) => {
                            console.error(
                                'Error patching upload metadata:',
                                err,
                            );
                        });
                }
            }

            setProgress(100);
            setIsUploading(false);
            pendingOptions.current = null;
        };

        uppy.on('progress', onProgress);
        uppy.on('upload-success', onSuccess);

        return () => {
            uppy.off('progress', onProgress);
            uppy.off('upload-success', onSuccess);
        };
    }, [uppy, auth.token]);

    const handleUpload = (
        file: File,
        options?: { password?: string; expiresAt?: number },
    ) => {
        uppy.cancelAll();
        pendingOptions.current = options || null;
        try {
            uppy.addFile({
                name: file.name,
                type: file.type,
                data: file,
            });
            uppy.upload();
            setIsUploading(true);
            setIsPaused(false);
        } catch (err) {
            console.error('Error adding file to Uppy:', err);
        }
    };

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
                uploader={handleUpload}
                progress={progress}
                isPaused={isPaused}
                isUploading={isUploading}
                onPause={() => {
                    uppy.pauseAll();
                    setIsPaused(true);
                }}
                onResume={() => {
                    uppy.resumeAll();
                    setIsPaused(false);
                }}
            />
        </Icons.Provider>
    );
}
