import AuthLayout from '@/layouts/auth-layout';
import { Upload } from '@datashare/types';
import { Head } from '@inertiajs/react';
import { DownloadWithoutPasswordPage } from '../../../../../figma/implementation/src';

export default function Show({ upload }: { upload: Upload }) {
    return <DownloadWithoutPasswordPage fileDetails={upload} />;
}

export function OriginalShowPage({ upload }: { upload: Upload }) {
    const formatBytes = (bytes: number, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    return (
        <AuthLayout
            title="File details"
            description="View file details and download"
        >
            <Head title={`File: ${upload.original_name}`} />

            <div className="flex flex-col gap-6">
                <div className="grid gap-2 text-center">
                    <h1
                        className="truncate text-2xl font-bold"
                        title={upload.original_name}
                    >
                        {upload.original_name}
                    </h1>
                    <p className="text-muted-foreground">
                        {formatBytes(upload.size)}
                    </p>
                </div>

                <div className="grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500 dark:text-gray-400">
                            Type:
                        </span>
                        <span className="max-w-[200px] truncate">
                            {upload.mime_type || 'Unknown'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500 dark:text-gray-400">
                            Expires:
                        </span>
                        <span>
                            {new Date(upload.expires_at).toLocaleDateString()}
                        </span>
                    </div>
                    {upload.deleted_at && (
                        <div className="rounded bg-red-50 p-2 text-center text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            This file has expired and is no longer available.
                        </div>
                    )}
                </div>

                {upload.download_url ? (
                    <a
                        href={upload.download_url}
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Download File
                    </a>
                ) : (
                    <button
                        disabled
                        className="w-full cursor-not-allowed rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                    >
                        Download Unavailable
                    </button>
                )}
            </div>
        </AuthLayout>
    );
}
