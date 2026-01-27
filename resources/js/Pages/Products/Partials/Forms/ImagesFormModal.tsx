import InputError from '@/Components/InputError';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import ProductType from '@/Types/ProductType';
import SortableImages from '@/Components/SortableImages';

interface ImagesFormProps {
  open: boolean;
  onClose: () => void;
  color?: {
    id: number;
    value: string;
  };
  newColorId?: number;
  images?: any[];
}

export default function ImagesFormModal({
  color,
  newColorId,
  open,
  onClose,
  images,
}: ImagesFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const product = usePage().props.product as ProductType;

  const { data, errors, setData, reset, setError, clearErrors } = useForm({
    images: [] as {
      id?: number;
      file?: File;
      preview?: string;
      uid?: string;
    }[],
    images_to_delete: [] as number[],
    attribute_id: 0,
  });

  useEffect(() => {
    if (!color) {
      reset();
    } else {
      setData('attribute_id', color.id);
      setData(
        'images',
        images?.map((img) => ({
          id: img.id,
          preview: img.url,
          uid: crypto.randomUUID(),
        })) || []
      );
    }
  }, [color]);

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

  const submitProductImages = () => {
    const imagesWithPosition = data.images.map((img, index) => ({
      ...img,
      position: index + 1,
    }));

    const payload = {
      ...data,
      images: imagesWithPosition,
    };

    // Ajustar lógica de envio conforme necessário (criação ou atualização)

    if (data.images.length === 0) {
      setError('images', 'O produto não pode ficar sem imagens.');
      return;
    }

    if (images && images?.length > 0) {
      router.post(
        route('productImages.update', product.id),
        {
          ...payload,
          _method: 'PATCH',
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            router.reload({ only: ['product'] });
            onClose();
            reset();
          },
        }
      );
    } else {
      router.post(
        route('productImages.store', product.id),
        {
          ...payload,
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            onClose();
            reset();
            router.reload({ only: ['product'] });
          },
        }
      );
    }
  };

  return (
    <Modal
      show={open}
      onClose={() => {
        onClose();
        clearErrors();
        setData(
          'images',
          images?.map((img) => ({
            id: img.id,
            preview: img.url,
            uid: crypto.randomUUID(),
          })) || []
        );
      }}
      layer={2}
    >
      <input
        type="file"
        multiple
        className="hidden"
        accept="image/*"
        ref={imageInputRef}
        onChange={(e) => handleAddImage(e)}
      />

      <>
        <h3 className="text-gray-600 text-lg font-bold mt-5 ">
          Imagens do produto na cor:{' '}
          <span className="border-b border-gray-400">
            {color?.value.toLocaleLowerCase()}
          </span>
        </h3>
        <SortableImages
          images={data.images}
          handleDelete={handleDeleteImage}
          setImages={setData}
          addImage={() => imageInputRef.current?.click()}
        />
      </>
      {errors.images && <InputError className="mt-2" message={errors.images} />}
      <div className="flex justify-end gap-3">
        <PrimaryButton
          outline
          onClick={() => {
            onClose();
            reset();
          }}
        >
          Cancelar
        </PrimaryButton>
        <PrimaryButton onClick={submitProductImages}>Salvar</PrimaryButton>
      </div>
    </Modal>
  );
}
