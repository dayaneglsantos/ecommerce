import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SizeGroupType from '@/Types/SizeGroupType';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

interface SizeGroupFormProps {
  open: boolean;
  onClose: () => void;
}

export default function SizeGroupForm({ open, onClose }: SizeGroupFormProps) {
  const sizeGroups = usePage().props?.sizeGroups as SizeGroupType[];

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSizeGroup, setSelectedSizeGroup] =
    useState<SizeGroupType | null>(null);

  const { data, setData, errors, post, reset } = useForm({
    name: '',
  });

  const createNewSizeGroup = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('sizeGroup.store'), {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  const handleDeleteSizeGroup = (sizeGroupId: number) => {
    router.delete(route('sizeGroup.destroy', sizeGroupId), {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        setSelectedSizeGroup(null);
      },
    });
  };

  return (
    <Modal show={open} onClose={onClose} maxWidth="sm" layer={2}>
      <h3 className="font-bold text-lg text-primary-dark">
        Adicionar novo grupo de tamanho
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Exemplos: Numérico calçado, Letra de roupa, Infantil.
      </p>
      <form>
        <InputLabel htmlFor="sizeGroupName" value="Nome do grupo" className="mt-4" />
        <TextInput
          id="sizeGroupName"
          type="text"
          className="mt-1 block w-full"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        <InputError className="mt-2" message={errors.name} />
        <div className="flex justify-end my-3 mt-6 gap-3">
          <PrimaryButton outline onClick={onClose} type="button">
            Cancelar
          </PrimaryButton>

          <PrimaryButton type="button" onClick={createNewSizeGroup}>
            Adicionar
          </PrimaryButton>
        </div>
      </form>
      <h5 className="mt-12">Grupos disponíveis:</h5>
      <div className="flex gap-2 flex-wrap mt-2">
        {sizeGroups?.map((sizeGroup) => (
          <div
            key={sizeGroup.id}
            className="p-1 bg-gray-200 rounded-full w-fit flex items-center gap-2"
          >
            <span>{sizeGroup.name}</span>

            <button
              type="button"
              onClick={() => {
                setSelectedSizeGroup(sizeGroup);
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
        title="Tem certeza que deseja excluir este grupo de tamanho?"
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedSizeGroup(null);
        }}
        onAccept={() => handleDeleteSizeGroup(selectedSizeGroup!.id)}
      />
    </Modal>
  );
}
