import { AppShell } from '@/components/app-shell';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { logout, upload } from '@/routes';
import { type SharedData } from '@/types';
import { PaginatedUploads } from '@datashare/types';
import { usePage } from '@inertiajs/react';
import { useContext } from 'react';
import { Icons, UserSpacePage } from '../../../../figma/implementation/src';

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
                refresher={() => {
                    fetch(
                        '/api/uploads/refresh?last_known_date=1770814660000',
                        {
                            headers: {
                                Authorization: `Bearer ${auth.token}`,
                            },
                        },
                    )
                        .then((response) => {
                            if (response.ok) {
                                return response.json();
                            }
                            return Promise.reject(
                                new Error('response is not ok', {
                                    cause: response,
                                }),
                            );
                        })
                        .then((jsonResult) => {
                            console.log(jsonResult);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }}
                uploads={listUpload(auth.token)}
                actions={{ logout, upload }}
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
