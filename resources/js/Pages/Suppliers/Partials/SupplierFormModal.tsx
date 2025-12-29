import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SupplierType from '@/Types/SupplierType';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface SupplierFormModalProps {
  open: boolean;
  onClose: () => void;
  supplier?: SupplierType | null;
}

export default function SupplierFormModal({
  open,
  onClose,
  supplier,
}: SupplierFormModalProps) {
  // =============== FORMULÁRIO ===============
  const { data, setData, reset, post, errors, patch } = useForm({
    name: '',
    cnpj: '',
    email: '',
    phone_number: '',
    contact_name: '',
  });

  //  ============== POPULAR FORMULÁRIO NA EDIÇÃO ===============
  useEffect(() => {
    if (supplier) {
      setData('name', supplier.name);
      setData('cnpj', supplier.cnpj);
      setData('email', supplier.email);
      setData('phone_number', supplier.phoneNumber);
      setData('contact_name', supplier.contactName);
    } else {
      reset();
    }
  }, [supplier]);

  //  =============== SUBMIT FORMULÁRIO ===============
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supplier) {
      patch(route('suppliers.update', supplier.id), {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    } else {
      post(route('suppliers.store'), {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  return (
    <Modal show={open} onClose={onClose}>
      <form onSubmit={submit}>
        <div>
          <InputLabel
            htmlFor="name"
            value="Nome do Fornecedor"
            className="mt-4"
          />
          <TextInput
            id="name"
            name="name"
            value={data.name}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('name', e.target.value)}
          />
          <InputError className="mt-2" message={errors.name} />
        </div>
        <div>
          <InputLabel htmlFor="cnpj" value="CNPJ" className="mt-4" />
          <TextInput
            id="cnpj"
            name="cnpj"
            mask="00.000.000/0000-00"
            value={data.cnpj}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('cnpj', e.target.value.replace(/\D/g, ''))}
          />
          <InputError className="mt-2" message={errors.cnpj} />
        </div>
        <GridContainer gap={4}>
          <GridItem size={6}>
            <InputLabel htmlFor="email" value="Email" className="mt-4" />
            <TextInput
              id="email"
              name="email"
              value={data.email}
              type="email"
              className="mt-1 block w-full"
              onChange={(e) => setData('email', e.target.value)}
            />
            <InputError className="mt-2" message={errors.email} />
          </GridItem>
          <GridItem size={6}>
            <InputLabel
              htmlFor="phoneNumber"
              value="Telefone"
              className="mt-4"
            />
            <TextInput
              id="phoneNumber"
              mask="(00) 00000-0000"
              name="phone_number"
              value={data.phone_number}
              type="text"
              className="mt-1 block w-full"
              onChange={(e) =>
                setData('phone_number', e.target.value.replace(/\D/g, ''))
              }
            />
            <InputError className="mt-2" message={errors.phone_number} />
          </GridItem>
        </GridContainer>
        <div>
          <InputLabel
            htmlFor="contact_name"
            value="Nome do contato na empresa"
            className="mt-4"
          />
          <TextInput
            id="contact_name"
            name="contact_name"
            value={data.contact_name}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('contact_name', e.target.value)}
          />
          <InputError className="mt-2" message={errors.contact_name} />
        </div>
        <div className="flex justify-end gap-3 mt-5 mb-3">
          <PrimaryButton
            type="button"
            outline
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancelar
          </PrimaryButton>
          <PrimaryButton type="submit">Salvar</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
