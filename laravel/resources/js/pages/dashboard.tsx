import { AppShell } from '@/components/app-shell';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { logout } from '@/routes';
import { type SharedData } from '@/types';
import { PaginatedUploads } from '@datashare/types';
import { usePage } from '@inertiajs/react';
import { useContext } from 'react';
import { Icons, UserSpacePage } from '../../../../figma/implementation/src';

function deleteUpload(token: string): (uploadId: string) => Promise<boolean> {
    return async (uploadId: string): Promise<boolean> => {
        const requestResult = await fetch(`/api/uploads/${uploadId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return requestResult.ok;
    };
}
function refreshUploads(
    token: string,
): (latest: number) => Promise<PaginatedUploads> {
    return async (latest: number): Promise<PaginatedUploads> => {
        const requestResult = await fetch(
            '/api/uploads/refresh' + `?last_known_date=${latest.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (!requestResult.ok) {
            throw new Error('Failed to refresh uploads');
        }
        return requestResult.json() as unknown as Promise<PaginatedUploads>;
    };
}
function listUpload(
    token: string,
): (page?: number) => Promise<PaginatedUploads> {
    return async (page?: number): Promise<PaginatedUploads> => {
        const resquetedPage = page ?? 0;
        const requestResult = await fetch(
            '/api/uploads' +
                (resquetedPage > 0 ? `?page=${Math.trunc(resquetedPage)}` : ''),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (!requestResult.ok) {
            throw new Error('Failed to fetch uploads');
        }
        return requestResult.json() as unknown as Promise<PaginatedUploads>;
    };
}

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    console.log({ auth });
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
                refresher={refreshUploads(auth.token)}
                uploads={listUpload(auth.token)}
                deleteUpload={deleteUpload(auth.token)}
                actions={{ logout }}
                Sidebar={Sidebar}
                user={auth.user}
                SidebarProvider={SidebarProvider}
                AppShell={AppShell}
                SidebarTrigger={SidebarTrigger}
                Avatar={Avatar}
                AvatarFallback={AvatarFallback}
            />
        </Icons.Provider>
    );
}
