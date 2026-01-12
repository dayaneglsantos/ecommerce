import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';

interface ColorFormProps {
  open: boolean;
  onClose: () => void;
}

export default function ColorForm({ open, onClose }: ColorFormProps) {
  const colors = usePage().props?.colors as any[];
  const colorAttributeId = usePage().props?.colorAttributeId as number;

  const { data, setData, errors, post } = useForm({
    value: '',
    attribute_id: colorAttributeId,
  });

  const createNewColor = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('attributeValue.store'), {
      onSuccess: () => {
        onClose();
        setData('value', '');
      },
    });
  };

  console.log(data);
  console.log(errors);

  return (
    <Modal show={open} onClose={onClose} maxWidth="sm" layer={1}>
      <h3 className="font-bold text-lg text-primary-dark">
        Adicionar nova cor
      </h3>
      <form onSubmit={createNewColor}>
        <InputLabel htmlFor="color" value="Cor" className="mt-4" />
        <TextInput
          id="color"
          type="text"
          className="mt-1 block w-full"
          value={data.value}
          onChange={(e) => setData('value', e.target.value)}
        />
        <InputError className="mt-2" message={errors.value} />
        <div className="flex justify-end my-3 mt-6 gap-3">
          <PrimaryButton outline onClick={onClose} type="button">
            Cancelar
          </PrimaryButton>

          <PrimaryButton type="submit">Adicionar</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
