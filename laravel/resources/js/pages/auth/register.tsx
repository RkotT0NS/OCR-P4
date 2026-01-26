import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { RegisterPage } from '../../../../../figma/implementation/src';

export default function Register() {
    return (
        <RegisterPage>
            <Form
                {...store.form()}
                transform={(formData) => ({
                    ...formData,
                    name: formData.email,
                })}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex w-full flex-col items-center gap-6 bg-white"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="flex w-full flex-col gap-4">
                            {/*
                                missing design
                                <div className="flex w-full flex-col gap-2">
                                <label
                                    className="text-base text-gray-800"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                            <input
                                className="w-full rounded-lg border border-gray-300 bg-white p-3"
                                id="name"
                                type="hidden"
                                // required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                name="name"
                                placeholder="Full name"
                            />
                            <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>*/}

                            <div className="flex w-full flex-col gap-2">
                                <label
                                    className="text-base text-gray-800"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3"
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="Saisissez votre email..."
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex w-full flex-col gap-2">
                                <label
                                    className="text-base text-gray-800"
                                    htmlFor="password"
                                >
                                    Mot de passe
                                </label>
                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3"
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Saisissez votre mot de passe..."
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex w-full flex-col gap-2">
                                <label
                                    className="text-base text-gray-800"
                                    htmlFor="password_confirmation"
                                >
                                    Verification du mot de passe
                                </label>
                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3"
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Saisissez le à nouveau"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <button
                                className="w-full rounded-lg p-3 text-center text-orange-600"
                                onClick={(event) => {
                                    event.preventDefault();
                                }}
                                tabIndex={5}
                            >
                                <span
                                    onClick={(event) => {
                                        event.preventDefault();
                                        location.href = login().url;
                                    }}
                                    className="hover:cursor-pointer"
                                >
                                    J'ai déjà un compte
                                </span>
                            </button>
                            <button
                                type="submit"
                                className="w-full rounded-lg border border-[#cd5e14]/50 bg-[#ff812d]/13 p-3 text-[#ba681f]"
                                tabIndex={6}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </RegisterPage>
    );
}
export function OriginalLaravelRegister() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
