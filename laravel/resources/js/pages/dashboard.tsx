import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import UploadComponents from '@/components/upload-component';
import AppLayout from '@/layouts/app-layout';
import { dashboard, logout, upload } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useContext } from 'react';
import { Icons, UserSpacePage } from '../../../../figma/implementation/src';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

function listUpload(token) {
    return fetch('/api/uploads', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
export default function Dashboard() {
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
            <UserSpacePage
                uploads={listUpload(auth.token)}
                actions={{ logout, upload }}
            />
        </Icons.Provider>
    );
}
export function OriginalLaravelDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    JOHN
                    <UploadComponents />
                    {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
                </div>
            </div>
        </AppLayout>
    );
}
