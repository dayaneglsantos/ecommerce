import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

interface SupplierFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SupplierFormModal({
  open,
  onClose,
}: SupplierFormModalProps) {
  const { data, setData, reset, post, errors, patch } = useForm({
    name: '',
    cnpj: '',
    email: '',
    phoneNumber: '',
    contactName: '',
  });

  return (
    <Modal show={open} onClose={onClose}>
      <form>
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
            value={data.cnpj}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('cnpj', e.target.value)}
          />
          <InputError className="mt-2" message={errors.cnpj} />
        </div>
        <div>
          <InputLabel htmlFor="email" value="Email" className="mt-4" />
          <TextInput
            id="email"
            name="email"
            value={data.email}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('email', e.target.value)}
          />
          <InputError className="mt-2" message={errors.email} />
        </div>
        <div>
          <InputLabel
            htmlFor="phoneNumber"
            value="Phone Number"
            className="mt-4"
          />
          <TextInput
            id="phoneNumber"
            name="phoneNumber"
            value={data.phoneNumber}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('phoneNumber', e.target.value)}
          />
          <InputError className="mt-2" message={errors.phoneNumber} />
        </div>
        <div>
          <InputLabel
            htmlFor="contactName"
            value="Nome do contato na empresa"
            className="mt-4"
          />
          <TextInput
            id="contactName"
            name="contactName"
            value={data.contactName}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('contactName', e.target.value)}
          />
          <InputError className="mt-2" message={errors.contactName} />
        </div>
      </form>
    </Modal>
  );
}
