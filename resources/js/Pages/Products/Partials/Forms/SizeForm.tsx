import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import SizeGroupType from '@/Types/SizeGroupType';
import SizeType from '@/Types/SizeType';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import SizeGroupForm from './SizeGroupForm';

interface SizeFormProps {
  open: boolean;
  onClose: () => void;
  defaultSizeGroupId?: number;
}

export default function SizeForm({
  open,
  onClose,
  defaultSizeGroupId,
}: SizeFormProps) {
  const sizes = usePage().props?.sizes as SizeType[];
  const sizeGroups = usePage().props?.sizeGroups as SizeGroupType[];

  const [openSizeGroupForm, setOpenSizeGroupForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);

  const { data, setData, errors, post, reset } = useForm({
    value: '',
    size_group_id: defaultSizeGroupId || '',
  });

  const sizeGroupOptions = sizeGroups?.map((sizeGroup) => ({
    value: sizeGroup.id,
    label: sizeGroup.name,
  }));

  const createNewSize = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('size.store'), {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  const handleDeleteSize = (sizeId: number) => {
    router.delete(route('size.destroy', sizeId), {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        setSelectedSize(null);
      },
    });
  };

  return (
    <Modal show={open} onClose={onClose} maxWidth="sm" layer={1}>
      <h3 className="font-bold text-lg text-primary-dark">
        Adicionar novo tamanho
      </h3>
      <form>
        <InputLabel htmlFor="sizeGroup" value="Grupo de tamanho" className="mt-4" />
        <SelectInput
          options={sizeGroupOptions || []}
          value={data.size_group_id}
          onChange={(e) => setData('size_group_id', e)}
          placeholder="Selecione um grupo"
        />
        <InputError className="mt-2" message={errors.size_group_id} />
        <div className="flex gap-1 items-center mt-1">
          <p className="text-sm text-gray-600">
            Não encontrou o grupo? Adicionar novo{' '}
          </p>
          <button
            type="button"
            onClick={() => setOpenSizeGroupForm(true)}
            className="text-primary cursor-pointer text-md"
          >
            <FaPlusCircle />
          </button>
        </div>

        <InputLabel htmlFor="sizeValue" value="Tamanho" className="mt-4" />
        <TextInput
          id="sizeValue"
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

          <PrimaryButton type="button" onClick={createNewSize}>
            Adicionar
          </PrimaryButton>
        </div>
      </form>
      <h5 className="mt-12">Tamanhos disponíveis:</h5>
      <div className="flex gap-2 flex-wrap mt-2">
        {sizes?.map((size) => (
          <div
            key={size.id}
            className="p-1 bg-gray-200 rounded-full w-fit flex items-center gap-2"
          >
            <span>{size.value}</span>

            <button
              type="button"
              onClick={() => {
                setSelectedSize(size);
                setOpenDeleteDialog(true);
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
        open={openDeleteDialog}
        title="Tem certeza que deseja excluir este tamanho?"
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedSize(null);
        }}
        onAccept={() => handleDeleteSize(selectedSize!.id)}
      />
      <SizeGroupForm
        open={openSizeGroupForm}
        onClose={() => setOpenSizeGroupForm(false)}
      />
    </Modal>
  );
}
