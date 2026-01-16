import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import SortableImages from './SortableImages';
import Modal from '@/Components/Modal';

interface ImagesFormProps {
  open: boolean;
  onClose: () => void;
  color?: {
    id: number;
    value: string;
  };
  newColorId?: number;
}

export default function ImagesFormModal({
  color,
  newColorId,
  open,
  onClose,
}: ImagesFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data, errors, setData, reset } = useForm({
    images: [] as {
      id?: number;
      file?: File;
      preview?: string;
      uid?: string;
    }[],
    images_to_delete: [] as number[],
  });

  useEffect(() => {
    if (!color) {
      reset();
    }
  }, [color]);

  // const imagesWithPosition = data.images.map((img, index) => ({
  //   ...img,
  //   position: index + 1,
  // }));

  // ==================== Adicionar nova imagem ao formulário ====================
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const filesArray = Array.from(files);

    filesArray.forEach((file: File, index: number) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData('images', [
          ...data.images,
          { file, preview: reader.result as string, uid: crypto.randomUUID() },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // ==================== Deletar imagem do formulário ====================
  const handleDeleteImage = (image: any) => {
    // Adicionar ao formulário o id para deletar no backend
    if (image.id) {
      setData('images_to_delete', [...data.images_to_delete, image.id]);
      setData(
        'images',
        data.images.filter((img: any) => img.id !== image.id)
      );
    } else {
      // Remover do formulário de novas imagens
      setData(
        'images',
        data.images.filter((img: any) => image.file.name !== img.file.name)
      );
    }
  };

  console.log('color', color);

  return (
    <Modal show={open} onClose={onClose} layer={2}>
      <input
        type="file"
        multiple
        className="hidden"
        accept="image/*"
        ref={imageInputRef}
        onChange={(e) => handleAddImage(e)}
      />
      {errors.images && (
        <InputError
          className="mt-2"
          message="Você deve adicionar pelo menos uma imagem."
        />
      )}

      <>
        <h3 className="text-primary text-lg font-bold mt-5 ">
          Imagens <span className="">{color?.value}</span>
        </h3>
        <SortableImages
          images={data.images}
          handleDelete={handleDeleteImage}
          setImages={setData}
          addImage={() => imageInputRef.current?.click()}
        />
      </>
    </Modal>
  );
}
