import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { LoginPage } from '../../../../../figma/implementation/src';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    console.log({
        reset: request().url,
        status,
        canResetPassword,
        canRegister,
        unstyled: new URLSearchParams(location.search).has('unstyled'),
    });
    if (new URLSearchParams(location.search).has('unstyled')) {
        return (
            <OriginalLogin
                {...{
                    status,
                    canResetPassword,
                    canRegister,
                }}
            />
        );
    }
    return (
        <LoginPage>
            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex w-full bg-white"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="flex w-full flex-col gap-4">
                            <div className="w-ful flex flex-col gap-2">
                                <Label
                                    className="text-base text-gray-800"
                                    htmlFor="email"
                                >
                                    Email
                                </Label>
                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3"
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Saisissez votre email..."
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex w-full flex-col gap-2">
                                <div className="flex items-center">
                                    <Label
                                        className="text-base text-gray-800"
                                        htmlFor="password"
                                    >
                                        Mot de passe
                                    </Label>
                                    {/*
                                        Missing design
                                        {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}*/}
                                </div>
                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800"
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Saisissez votre mot de passe..."
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/*
                                Missing remember me design
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                    />
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                                */}

                            <div className="flex w-full flex-col gap-2">
                                {canRegister && (
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault();
                                        }}
                                        className="w-full rounded-lg p-3 text-center text-orange-600"
                                        tabIndex={5}
                                    >
                                        <span
                                            onClick={(event) => {
                                                event.preventDefault();
                                                location.href = register().url;
                                            }}
                                            className="hover:cursor-pointer"
                                        >
                                            Créer un compte
                                        </span>
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="w-full rounded-lg border border-[#cd5e14]/50 bg-[#ff812d]/13 p-3 text-[#ba681f]"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Connexion
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </LoginPage>
    );
}
export function OriginalLogin({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-muted-foreground text-center text-sm">
                                Don't have an account?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Sign up
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
