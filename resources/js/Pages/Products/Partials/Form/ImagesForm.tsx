import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import SortableImages from './SortableImages';

interface ImagesFormProps {
  color?: {
    id: number;
    value: string;
  };
  newColorId?: number;
}

export default function ImagesForm({ color, newColorId }: ImagesFormProps) {
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
    <>
      <input
        type="file"
        multiple
        className="hidden"
        accept="image/*"
        ref={imageInputRef}
        onChange={(e) => handleAddImage(e)}
      />
      {data.images.length === 0 && (
        <button
          type="button"
          className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold`}
          onClick={() => imageInputRef.current?.click()}
        >
          Adicionar imagens
        </button>
      )}
      {errors.images && (
        <InputError
          className="mt-2"
          message="Você deve adicionar pelo menos uma imagem."
        />
      )}

      {data.images && data.images.length > 0 && (
        <>
          <h4 className="text-primary font-bold mt-5 ">
            Imagens <span className="">{color?.value}</span>
          </h4>
          <SortableImages
            images={data.images}
            handleDelete={handleDeleteImage}
            setImages={setData}
            addImage={() => imageInputRef.current?.click()}
          />
        </>
      )}
    </>
  );
}
