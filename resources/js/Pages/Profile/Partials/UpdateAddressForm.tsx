import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { Tooltip } from 'react-tooltip';

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
  const { data, setData, post, processing } = useForm({
    zip_code: user.zip_code,
    state: user.state,
    city: user.city,
    street: user.street,
    number: user.number,
    complement: user.complement,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    post(route('profile.updateAddress'));
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
        <div className="mt-6 grid grid-cols-5 gap-4 shadow rounded-2xl p-4 pt-8 -mx-4 relative">
          <div className="absolute top-3 right-3 flex gap-2">
            <Tooltip id="edit" place="top" content="Editar" />
            <Tooltip id="delete" place="top" content="Excluir" />
            <FaPencilAlt data-tooltip-id="edit" className="cursor-pointer" />
            <FaTrashAlt data-tooltip-id="delete" className="cursor-pointer" />
          </div>
          <div className="col-span-2 md:col-span-1 ">
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
          <div className="col-span-3 md:col-span-2">
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

          <div className="col-span-5 md:col-span-2">
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
          <div className="col-span-5 md:col-span-2">
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
          <div className="col-span-2 md:col-span-1">
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
          <div className="col-span-3 md:col-span-2">
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
          <div className="flex items-center gap-4 mt-3">
            <PrimaryButton disabled={processing}>Salvar</PrimaryButton>
          </div>
        </div>
      </form>
    </section>
  );
}
