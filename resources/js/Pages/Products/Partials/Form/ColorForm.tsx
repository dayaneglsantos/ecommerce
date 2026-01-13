import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

interface ColorFormProps {
  open: boolean;
  onClose: () => void;
}

export default function ColorForm({ open, onClose }: ColorFormProps) {
  const colors = usePage().props?.colors as any[];
  const colorAttributeId = usePage().props?.colorAttributeId as number;

  const [openDeleteColorDialog, setOpenDeleteColorDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);

  const { data, setData, errors, post, reset } = useForm({
    value: '',
    attribute_id: colorAttributeId,
  });

  const createNewColor = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('attributeValue.store'), {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  const handleDeleteColor = (colorId: number) => {
    router.delete(route('attributeValue.destroy', colorId), {
      onSuccess: () => {
        setOpenDeleteColorDialog(false);
        setSelectedColor(null);
      },
    });
  };

  return (
    <Modal show={open} onClose={onClose} maxWidth="sm" layer={1}>
      <h3 className="font-bold text-lg text-primary-dark">
        Adicionar nova cor
      </h3>
      <form>
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

          <PrimaryButton type="button" onClick={createNewColor}>
            Adicionar
          </PrimaryButton>
        </div>
      </form>
      <h5 className="mt-12">Cores disponíveis:</h5>
      <div className="flex gap-2 flex-wrap mt-2">
        {colors.map((color) => (
          <div className="p-1 bg-gray-200 rounded-full w-fit flex items-center gap-2">
            <span>{color.value}</span>

            <button
              type="button"
              onClick={() => {
                setSelectedColor(color);
                setOpenDeleteColorDialog(true);
              }}
              className="inline-flex items-center justify-center p-0.5 bg-gray-400 rounded-full text-white"
            >
              <IoClose />
            </button>

            <Tooltip
              id="delete"
              content="Excluir"
              className="!p-2 !text-[12px]"
            />
          </div>
        ))}
      </div>
      <ConfirmDialog
        open={openDeleteColorDialog}
        title="Tem certeza que deseja excluir esta cor?"
        onClose={() => {
          setOpenDeleteColorDialog(false);
          setSelectedColor(null);
        }}
        onAccept={() => handleDeleteColor(selectedColor!.id)}
      />
    </Modal>
  );
}
