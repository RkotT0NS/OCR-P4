import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];
function ProfileAvatarEditor({
    onValidationError,
}: {
    onValidationError?: (hasError: boolean) => void;
}) {
    const { auth } = usePage<SharedData>().props;
    const { setData, errors, clearErrors } = useForm<{
        avatar: File | null;
    }>({
        avatar: null,
    });
    const [localError, setLocalError] = useState<string | null>(null);

    const handleError = (error: string | null) => {
        setLocalError(error);
        if (onValidationError) {
            onValidationError(error !== null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        clearErrors('avatar');

        if (!file) {
            handleError(null);
            setData('avatar', null);
            return;
        }

        if (file.type !== 'image/png') {
            handleError('The avatar must be a file of type: png.');
            setData('avatar', null);
            return;
        }

        const img = new window.Image();
        img.onload = () => {
            if (img.width !== 80 || img.height !== 80) {
                handleError('The avatar has invalid image dimensions.');
                setData('avatar', null);
            } else {
                handleError(null);
                setData('avatar', file);
            }
            URL.revokeObjectURL(img.src);
        };
        img.onerror = () => {
            handleError('The avatar must be an image.');
            setData('avatar', null);
            URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(file);
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor="avatar">Avatar (PNG, 80x80)</Label>

            {auth.user.avatar_url && (
                <div className="mb-2">
                    <img
                        src={auth.user.avatar_url as string}
                        alt="Current Avatar"
                        className="h-20 w-20 rounded-full border border-gray-200 object-cover"
                    />
                </div>
            )}

            <Input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/png"
                onChange={handleFileChange}
            />

            <InputError
                className="mt-2"
                message={localError || errors.avatar}
            />
        </div>
    );
}

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const [hasAvatarError, setHasAvatarError] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile Settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <ProfileAvatarEditor
                                    onValidationError={setHasAvatarError}
                                />
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    A new verification link has
                                                    been sent to your email
                                                    address.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing || hasAvatarError}
                                        data-test="update-profile-button"
                                    >
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Saved
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
