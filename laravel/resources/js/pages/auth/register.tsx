import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { RegisterPage } from '../../../../../figma/implementation/src';

export default function Register() {
    return (
        <RegisterPage>
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex w-full flex-col items-center gap-6 bg-white"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="flex w-full flex-col gap-4">
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
                                    htmlFor="name"
                                >
                                    Nom
                                </label>
                                <input
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3"
                                    id="name"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Saisissez votre nom complet..."
                                />
                                <InputError message={errors.name} />
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
                                Créer mon compte
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </RegisterPage>
    );
}
