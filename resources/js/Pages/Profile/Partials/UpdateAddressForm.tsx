import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { AddressType } from '@/Types/AddressType';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
  const [userAddresses, setUserAddresses] = useState<AddressType[]>(
    user.addresses
  );
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  // ----------- Carregar endereços do usuário --------------
  useEffect(() => {
    if (user.addresses.length === 0) {
      setUserAddresses([
        {
          id: 0,
          zip_code: '',
          state: '',
          city: '',
          street: '',
          number: '',
          complement: '',
          default: false,
        },
      ]);
      setData('default', true);
      setEditingAddressId(0);
    } else {
      setUserAddresses(user.addresses);
    }
  }, [user.addresses]);

  // ----------- Formulário --------------
  const { data, setData, errors, post, patch, processing, reset } = useForm({
    zip_code: '',
    state: '',
    city: '',
    street: '',
    number: '',
    complement: '',
    default: false,
  });

  // ----------- Cadastro e Edição de endereço --------------
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAddressId === 0) {
      post(route('address.createUserAddress', user.id), {
        preserveScroll: true,
        onSuccess: () => {
          setEditingAddressId(null);
          reset();
        },
      });
    } else {
      patch(route('address.update', editingAddressId!), {
        preserveScroll: true,
        onSuccess: () => {
          setEditingAddressId(null);
          reset();
        },
      });
    }
  };

  // ----------- Exclusão de endereço --------------
  const handleDeleteAddress = (addressId: number) => {
    const filteredAddresses = userAddresses.filter(
      (address) => address.id !== addressId
    );
    setUserAddresses(filteredAddresses);
    setEditingAddressId(null);

    router.delete(route('address.destroy', addressId), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
    });
  };

  // ----------- Definir endereço padrão --------------
  const handleDefaultAddress = (addressId: number) => {
    router.patch(route('address.default', addressId));
  };

  // ----------- Desabilitar botão adicionar novo endereço --------------
  const newAddressButtonDisabled =
    user.addresses.length === 0 || editingAddressId !== null;

  // ----------- Atualizar campo default do form ao editar endereço --------------
  useEffect(() => {
    if (editingAddressId !== null) {
      setData(
        'default',
        userAddresses.find((addr) => addr.id === editingAddressId)?.default ||
          false
      );
    }
  }, [editingAddressId]);

  // ----------- Buscar CEP --------------
  const searchCep = async () => {
    const toastId = toast.loading('Buscando CEP...');
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${data.zip_code}/json/`
      );
      const addressData = await response.json();

      if (addressData.erro) {
        toast.error(
          'Ops...CEP não encontrado. Mas você pode seguir o preenchimento manualmente!',
          {
            id: toastId,
          }
        );
        return;
      }
      toast.dismiss(toastId);
      setData('state', addressData.uf);
      setData('city', addressData.localidade);
      setData('street', addressData.logradouro);
      setData('number', '');
      setData('complement', '');
    } catch (error) {
      toast.error(
        'Ops...Erro ao buscar CEP. Mas você pode seguir o preenchimento manualmente.',
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Endereço</h2>

        <p className="mt-1 text-sm text-gray-600">
          Atualize as informações do seu endereço.
        </p>
      </header>

      <form onSubmit={submit} autoComplete="off">
        {userAddresses.map((address: AddressType, index: number) => (
          <div
            className="mt-6 grid grid-cols-5 gap-4 shadow-full rounded-2xl p-4 pt-14 -mx-4 relative"
            key={index}
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                disabled={
                  editingAddressId !== address.id && editingAddressId !== null
                }
                onClick={() => {
                  if (editingAddressId === address.id) return;
                  setEditingAddressId(address.id);
                  setData({
                    zip_code: address.zip_code,
                    state: address.state,
                    city: address.city,
                    street: address.street,
                    number: address.number,
                    complement: address.complement || '',
                  });
                }}
              >
                <FaPencilAlt
                  data-tooltip-id="edit"
                  className={`cursor-pointer ${
                    editingAddressId === null
                      ? 'text-gray-500'
                      : 'text-gray-200'
                  } outline-none`}
                />
                <Tooltip
                  id="edit"
                  place="top"
                  content="Editar"
                  className="!p-2 !text-[12px]"
                />
              </button>
              <button
                type="button"
                disabled={
                  editingAddressId !== address.id && editingAddressId !== null
                }
                onClick={() => {
                  if (editingAddressId === address.id) return;
                  editingAddressId
                    ? setUserAddresses(user.addresses)
                    : setOpenConfirmDialog(true);
                  setSelectedAddressId(address.id);
                }}
              >
                <FaTrashAlt
                  data-tooltip-id="delete"
                  className={`cursor-pointer ${
                    editingAddressId === null
                      ? 'text-gray-500 hover:text-red-600'
                      : 'text-gray-200'
                  } outline-none`}
                />
                <Tooltip
                  id="delete"
                  place="top"
                  content="Excluir"
                  className="!p-2 !text-[12px]"
                />
              </button>
            </div>
            {editingAddressId !== address.id && (
              <div
                className={`absolute top-4 left-4 border border-primary p-1 text-[12px] rounded-full px-2 text-primary-dark  ${
                  address.default ? 'bg-gray-200' : 'bg-gray-50 '
                }`}
              >
                <button
                  type="button"
                  disabled={address.default && editingAddressId === null}
                  onClick={() => {
                    if (editingAddressId === address.id) {
                      setData('default', !data.default);
                      const updatedAddresses = userAddresses.map((addr) => ({
                        ...addr,
                        default: !addr.default,
                      }));
                      setUserAddresses(updatedAddresses);
                    } else {
                      handleDefaultAddress(address.id);
                    }
                  }}
                >
                  {address.default ? 'Endereço Padrão' : 'Definir como padrão'}
                </button>
              </div>
            )}
            <div className="col-span-2 md:col-span-1 ">
              <InputLabel htmlFor="zip_code" value="CEP" />

              <TextInput
                mask={'00.000-000'}
                id="zip_code"
                className="mt-1 block w-full"
                value={
                  editingAddressId === address.id
                    ? data.zip_code
                    : address.zip_code
                }
                onChange={(e) => {
                  if (editingAddressId === null) return;
                  setData('zip_code', e.target.value.replace(/\D/g, ''));
                }}
                required
                icon={
                  <GoSearch
                    onClick={() => {
                      if (editingAddressId === null) return;
                      searchCep();
                    }}
                    className={`${
                      editingAddressId !== null ? 'cursor-pointer' : ''
                    }`}
                  />
                }
                disabled={
                  editingAddressId === null || editingAddressId !== address.id
                }
              />

              <InputError className="mt-2" message={errors.zip_code} />
            </div>
            <div className="col-span-3 md:col-span-2">
              <InputLabel htmlFor="state" value="Estado" />

              <TextInput
                id="state"
                className="mt-1 block w-full"
                value={
                  editingAddressId === address.id ? data.state : address.state
                }
                onChange={(e) => {
                  setData('state', e.target.value);
                }}
                required
                disabled={
                  editingAddressId === null || editingAddressId !== address.id
                }
              />

              <InputError className="mt-2" message={errors.state} />
            </div>

            <div className="col-span-5 md:col-span-2">
              <InputLabel htmlFor="city" value="Cidade" />

              <TextInput
                id="city"
                type="text"
                className="mt-1 block w-full"
                value={
                  editingAddressId === address.id ? data.city : address.city
                }
                onChange={(e) => setData('city', e.target.value)}
                required
                disabled={
                  editingAddressId === null || editingAddressId !== address.id
                }
              />

              <InputError className="mt-2" message={errors.city} />
            </div>
            <div className="col-span-5 md:col-span-2">
              <InputLabel htmlFor="street" value="Logradouro" />

              <TextInput
                id="street"
                type="text"
                className="mt-1 block w-full"
                value={
                  editingAddressId === address.id ? data.street : address.street
                }
                onChange={(e) => setData('street', e.target.value)}
                required
                disabled={
                  editingAddressId === null || editingAddressId !== address.id
                }
              />

              <InputError className="mt-2" message={errors.street} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <InputLabel htmlFor="number" value="Número" />

              <TextInput
                id="number"
                type="text"
                className="mt-1 block w-full"
                value={
                  editingAddressId === address.id ? data.number : address.number
                }
                onChange={(e) => setData('number', e.target.value)}
                required
                disabled={
                  editingAddressId === null || editingAddressId !== address.id
                }
              />

              <InputError className="mt-2" message={errors.number} />
            </div>
            <div className="col-span-3 md:col-span-2">
              <InputLabel htmlFor="complement" value="Complemento" />

              <TextInput
                id="complement"
                type="text"
                className="mt-1 block w-full"
                value={
                  editingAddressId === address.id
                    ? data.complement
                    : address.complement || ''
                }
                onChange={(e) => setData('complement', e.target.value)}
                disabled={
                  editingAddressId === null || editingAddressId !== address.id
                }
              />

              <InputError className="mt-2" message={errors.complement} />
            </div>
            <div className="flex items-center gap-4 mt-3">
              {editingAddressId === address.id && (
                <PrimaryButton
                  disabled={processing}
                  outline
                  onClick={() => {
                    setEditingAddressId(null);
                    reset();
                    if (editingAddressId === 0) {
                      setUserAddresses(
                        userAddresses.filter((addr) => addr.id !== address.id)
                      );
                    }
                  }}
                >
                  Cancelar
                </PrimaryButton>
              )}
              {editingAddressId === address.id && (
                <PrimaryButton disabled={processing}>Salvar</PrimaryButton>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold ${
            newAddressButtonDisabled
              ? 'opacity-50'
              : 'cursor-pointer hover:bg-gray-100'
          }`}
          disabled={newAddressButtonDisabled}
          onClick={() => {
            setUserAddresses([
              ...userAddresses,
              {
                id: 0,
                zip_code: '',
                state: '',
                city: '',
                street: '',
                number: '',
                complement: '',
                default: false,
              },
            ]);
            setEditingAddressId(0);
          }}
        >
          Adicionar novo endereço
        </button>
      </form>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
          setSelectedAddressId(null);
        }}
        onAccept={() => {
          selectedAddressId && handleDeleteAddress(selectedAddressId);
          setSelectedAddressId(null);
          setOpenConfirmDialog(false);
        }}
        title="Tem certesa que deseja excluir este endereço?"
        description="Esta ação não pode ser desfeita."
      />
    </section>
  );
}
