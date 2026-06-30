import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ColorType from '@/Types/ColorType';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

interface ColorFormProps {
  open: boolean;
  onClose: () => void;
}

export default function ColorForm({ open, onClose }: ColorFormProps) {
  const colors = usePage().props?.colors as ColorType[];

  const [openDeleteColorDialog, setOpenDeleteColorDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);

  const { data, setData, errors, post, reset } = useForm({
    name: '',
    hex_code: '#000000',
  });

  const createNewColor = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('color.store'), {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  const handleDeleteColor = (colorId: number) => {
    router.delete(route('color.destroy', colorId), {
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
        <InputLabel htmlFor="color" value="Nome da cor" className="mt-4" />
        <div className="flex gap-3 items-center">
          <div className="grow">
            <TextInput
              id="color"
              type="text"
              className="mt-1 block w-full"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
          </div>
          <input
            type="color"
            value={data.hex_code}
            onChange={(e) => setData('hex_code', e.target.value)}
            className="mt-1 h-10 w-12 rounded-md border border-gray-300 shrink-0 cursor-pointer"
            title="Selecionar cor"
          />
        </div>
        <InputError className="mt-2" message={errors.name} />
        <InputError className="mt-2" message={errors.hex_code} />
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
        {colors?.map((color) => (
          <div
            key={color.id}
            className="p-1 bg-gray-200 rounded-full w-fit flex items-center gap-2"
          >
            <span
              className="inline-block w-3 h-3 rounded-full border border-gray-300"
              style={{ backgroundColor: color.hexCode || undefined }}
            />
            <span>{color.name}</span>

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
