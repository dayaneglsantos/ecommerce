import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { GoSearch } from 'react-icons/go';

interface UpdateProfileInformationProps {
  status: string | null;
  className?: string;
  user: any;
}

export default function UpdateAddress({
  status,
  className = '',
  user,
}: UpdateProfileInformationProps) {
  console.log(user);

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      // zip_code: user.zip_code,
      // state: user.state,
      // city: user.city,
      // street: user.street,
      // number: user.number,
      // complement: user.complement,
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Endereço</h2>

        <p className="mt-1 text-sm text-gray-600">
          Atualize as informações do seu endereço.
        </p>
      </header>

      <form onSubmit={submit}>
        <div className="mt-6 grid grid-cols-5 gap-4 ">
          <div className="col-span-1">
            <InputLabel htmlFor="zip_code" value="CEP" />

            <TextInput
              id="zip_code"
              className="mt-1 block w-full"
              // value={data.zip_code}
              // onChange={(e) => setData('zip_code', e.target.value)}
              required
              isFocused
              icon={<GoSearch />}
            />

            {/* <InputError className="mt-2" message={errors.zip_code} /> */}
          </div>
          <div className="col-span-2">
            <InputLabel htmlFor="state" value="Estado" />

            <TextInput
              id="state"
              className="mt-1 block w-full"
              // value={data.state}
              // onChange={(e) => setData('state', e.target.value)}
              required
              isFocused
            />

            {/* <InputError className="mt-2" message={errors.state} /> */}
          </div>

          <div className="col-span-2">
            <InputLabel htmlFor="city" value="Cidade" />

            <TextInput
              id="city"
              type="text"
              className="mt-1 block w-full"
              // value={data.city}
              // onChange={(e) => setData('city', e.target.value)}
              required
            />

            {/* <InputError className="mt-2" message={errors.email} /> */}
          </div>
          <div className="col-span-2">
            <InputLabel htmlFor="street" value="Logradouro" />

            <TextInput
              id="street"
              type="text"
              className="mt-1 block w-full"
              // value={data.street}
              // onChange={(e) => setData('street', e.target.value)}
              required
            />

            {/* <InputError className="mt-2" message={errors.street} /> */}
          </div>
          <div className="col-span-1">
            <InputLabel htmlFor="number" value="Número" />

            <TextInput
              id="number"
              type="text"
              className="mt-1 block w-full"
              // value={data.number}
              // onChange={(e) => setData('number', e.target.value)}
              required
            />

            {/* <InputError className="mt-2" message={errors.number} /> */}
          </div>
          <div className="col-span-2">
            <InputLabel htmlFor="complement" value="Complemento" />

            <TextInput
              id="complement"
              type="text"
              className="mt-1 block w-full"
              // value={data.complement}
              // onChange={(e) => setData('complement', e.target.value)}
              required
            />

            {/* <InputError className="mt-2" message={errors.complement} /> */}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3">
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
