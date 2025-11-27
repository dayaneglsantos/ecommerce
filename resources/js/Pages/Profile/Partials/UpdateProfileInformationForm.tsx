import Avatar from '@/Components/Avatar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { UserType } from '@/Types/UserType';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat); // Adiciona o plugin de formato personalizado

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
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const { alert } = usePage().props as any;

  const [birthDate, setBirthDate] = useState(
    (user.birthdate && dayjs(user.birthdate).format('DD/MM/YYYY')) || null
  );

  const {
    data,
    setData,
    patch,
    errors,
    processing,
    recentlySuccessful,
    setError,
  } = useForm<{
    name: string;
    email: string;
    cpf: string | null;
    phone_number: string | null;
    gender: string;
    birthdate: string | null;
  }>({
    name: user.name,
    email: user.email,
    cpf: user.cpf,
    phone_number: user.phone_number,
    gender: user.gender || '',
    birthdate: null,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (birthDate !== null && !dayjs(birthDate, 'DD/MM/YYYY', true).isValid()) {
      setError('birthdate', 'Data de nascimento inválida.');
      return;
    }

    patch(route('profile.update'), {
      preserveScroll: true,
    });
  };

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Criar uma URL de visualização para a imagem selecionada
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    router.post(
      route('profile.updateProfileImage'),
      {
        profile_image: file,
      },
      {
        forceFormData: true,
      }
    );
  };

  const handleDeleteProfileImage = () => {
    router.delete(route('profile.destroyImage'), {
      preserveScroll: true,
    });
    setProfileImagePreview(null);
  };

  useEffect(() => {
    if (user.profile_image) {
      setProfileImagePreview(`storage/${user.profile_image}`);
    }
  }, [user.profile_image]);

  useEffect(() => {
    if (alert?.success) {
      toast.success(alert.success);
    }
    if (alert?.error) {
      toast.error(alert.error);
    }
  }, [alert]);

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
          <div className="col-span-6">
            <div className="flex flex-col items-center gap-2 mb-3">
              <div className="relative group w-fit">
                <Avatar
                  size="lg"
                  src={profileImagePreview}
                  className="cursor-pointer"
                />
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <span className="text-white text-sm">Alterar</span>
                </div>
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                id="profile_image"
                onChange={(e) => handleChangeProfileImage(e)}
              />

              <PrimaryButton
                type="button"
                className="text-sm"
                outline
                onClick={handleDeleteProfileImage}
              >
                Remover atual
              </PrimaryButton>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
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

          <div className="col-span-6 md:col-span-3">
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

          <div className="col-span-3 md:col-span-2 ">
            <InputLabel htmlFor="cpf" value="CPF" />

            <TextInput
              mask="000.000.000-00"
              id="cpf"
              type="text"
              className="mt-1 block w-full"
              value={data.cpf || ''}
              onChange={(e) => {
                setData('cpf', e.target.value.replace(/\D/g, '')); // Substitui tudo que não for dígito
              }}
              required
            />

            <InputError className="mt-2" message={errors.cpf} />
          </div>
          <div className="col-span-3 md:col-span-2">
            <InputLabel htmlFor="phone_number" value="Telefone" />

            <TextInput
              mask="(00) 00000-0000"
              id="phone_number"
              type="text"
              className="mt-1 block w-full"
              value={data.phone_number || ''}
              onChange={(e) => {
                setData('phone_number', e.target.value.replace(/\D/g, '')); // Substitui tudo que não for dígito
              }}
              required
            />

            <InputError className="mt-2" message={errors.phone_number} />
          </div>
          <div className="col-span-3 md:col-span-2 ">
            <InputLabel htmlFor="birthdate" value="Data de Nascimento" />

            <TextInput
              mask={'00/00/0000'}
              id="birthdate"
              type="text"
              className="mt-1 block w-full"
              value={birthDate || ''}
              onChange={(e) => {
                const value = e.target.value;
                setBirthDate(value);
                // Só tenta validar quando tiver 10 caracteres
                if (
                  value.length === 10 &&
                  dayjs(value, 'DD/MM/YYYY', true).isValid()
                ) {
                  const formatted = dayjs(value, 'DD/MM/YYYY').format(
                    'YYYY-MM-DD'
                  );
                  setData('birthdate', formatted);
                } else {
                  // ainda está digitando → não envia inválido para o backend
                  setData('birthdate', null);
                }
              }}
              required
            />

            <InputError className="mt-2" message={errors.birthdate} />
          </div>
          <div className="col-span-3 md:col-span-2 ">
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
              Seu endereço de email não foi verificado.{' '}
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
          <PrimaryButton disabled={processing} type="submit">
            Salvar
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}
