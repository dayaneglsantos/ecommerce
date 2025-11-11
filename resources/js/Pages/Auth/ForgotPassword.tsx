import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Esqueci minha senha" />

            <div className="mb-4 text-sm text-gray-600">
                Esqueceu sua senha? Sem problemas.
                <p>
                    Basta nos informar seu e-mail e nós enviaremos um link para
                    que você redefina sua senha.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar link de redefinição de senha
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
