import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { UserType } from '@/Types/UserType';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';

interface UpdateProfileInformationProps {
  mustVerifyEmail: boolean;
  status: string | null;
  className?: string;
  user: UserType;
}

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
  user,
}: UpdateProfileInformationProps) {
  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone_number: user.phone_number,
      gender: user.gender || '',
      birthdate: user.birthdate,
      profile_image: user.profile_image,
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    patch(route('profile.update'));
  };

  console.log(data);

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Informações de Perfil
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Atualize as informações do seu perfil.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3 ">
            <InputLabel htmlFor="name" value="Name" />

            <TextInput
              id="name"
              className="mt-1 block w-full"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
              isFocused
            />

            <InputError className="mt-2" message={errors.name} />
          </div>

          <div className="col-span-3 ">
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
              icon={
                user.email_verified_at ? (
                  <MdVerified className="text-green-600" />
                ) : (
                  <FaTriangleExclamation className="text-red-600" />
                )
              }
              tooltip={
                user.email_verified_at
                  ? 'Email verificado'
                  : 'Email não verificado'
              }
            />

            <InputError className="mt-2" message={errors.email} />
          </div>

          <div className="col-span-2 ">
            <InputLabel htmlFor="cpf" value="CPF" />

            <TextInput
              mask="000.000.000-00"
              id="cpf"
              type="text"
              className="mt-1 block w-full"
              value={data.cpf}
              onChange={(e) => setData('cpf', e.target.value)}
              required
            />

            <InputError className="mt-2" message={errors.cpf} />
          </div>
          <div className="col-span-2 ">
            <InputLabel htmlFor="phone_number" value="Telefone" />

            <TextInput
              mask="(00) 00000-0000"
              id="phone_number"
              type="text"
              className="mt-1 block w-full"
              value={data.phone_number}
              onChange={(e) => setData('phone_number', e.target.value)}
              required
            />

            <InputError className="mt-2" message={errors.phone_number} />
          </div>
          <div className="col-span-2 ">
            <InputLabel htmlFor="birthdate" value="Data de Nascimento" />

            <TextInput
              mask={'00/00/0000'}
              id="birthdate"
              type="text"
              className="mt-1 block w-full"
              value={data.birthdate}
              onChange={(e) => setData('birthdate', e.target.value)}
              required
            />

            <InputError className="mt-2" message={errors.birthdate} />
          </div>
          <div className="col-span-2 ">
            <InputLabel htmlFor="gender" value="Gênero" />

            <SelectInput
              id="gender"
              value={data.gender}
              onChange={(e) => {
                setData('gender', e.target.value as 'M' | 'F');
              }}
              options={[
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Feminino' },
              ]}
            />

            <InputError className="mt-2" message={errors.gender} />
          </div>
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Seu endereço de email não foi verificado.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Clique aqui para reenviar o email de verificação.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 text-sm font-medium text-green-600">
                Um novo link de verificação foi enviado para o seu endereço de
                email.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Salvar</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Salvo</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
