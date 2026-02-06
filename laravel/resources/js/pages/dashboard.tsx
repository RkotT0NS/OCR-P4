import { logout, upload } from '@/routes';
import { type SharedData } from '@/types';
import { UploadDetail } from '@datashare/types';
import { usePage } from '@inertiajs/react';
import { useContext } from 'react';
import { Icons, UserSpacePage } from '../../../../figma/implementation/src';

async function listUpload(token: string): Promise<UploadDetail[]> {
    return (
        await fetch('/api/uploads', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const resolved: { data: UploadDetail[] } =
                response.json() as unknown as { data: UploadDetail[] };
            return resolved;
        })
    ).data;
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
