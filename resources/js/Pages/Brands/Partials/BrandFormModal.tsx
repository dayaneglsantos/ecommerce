import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface BrandFormModalProps {
  open: boolean;
  onClose: () => void;
  brand?: BrandType | null;
}

export default function BrandFormModal({
  open,
  onClose,
  brand,
}: BrandFormModalProps) {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // =============== FORMULÁRIO ===============
  const { data, setData, reset, post, errors, patch } = useForm({
    name: '',
    status: '',
    logo: '' as File | string,
    website: '',
    slug: '',
  });

  //  ============== POPULAR FORMULÁRIO NA EDIÇÃO ===============
  useEffect(() => {
    if (brand) {
      setData('name', brand.name);
      setData('status', brand.status);
      setData('logo', brand.logo);
      setImagePreview(brand.logo);
      setData('website', brand.website);
      setData('slug', brand.slug);
    } else {
      reset();
    }
  }, [brand]);

  //  =============== SUBMIT FORMULÁRIO ===============
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: data.name,
      status: data.status,
      website: data.website,
      slug: data.slug,
      ...(data.logo instanceof File ? { logo: data.logo } : {}),
    };

    if (brand) {
      router.post(
        route('brands.update', brand.id),
        { ...payload, _method: 'PATCH' },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      post(route('brands.store'), {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData('logo', file);

    // Criar uma URL de visualização para a imagem selecionada
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  console.log('data', data);
  console.log(errors);

  return (
    <Modal
      show={open}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <form onSubmit={submit}>
        <div className="flex justify-center">
          <div className="relative w-24 h-24 flex justify-center items-center rounded-full group border border-gray-300 overflow-hidden shadow-full">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Logo da Marca"
                className="object-cover"
              />
            ) : (
              <p className="text-center text-gray-500 text-xs">
                Clique para adicionar logo
              </p>
            )}
            <div
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
              onClick={() => inputImageRef.current?.click()}
            >
              <span className="text-white text-sm">Alterar</span>
            </div>
          </div>
          <input
            ref={inputImageRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        <GridContainer gap={3}>
          <GridItem size={12}>
            <InputLabel htmlFor="name" value="Nome da Marca" className="mt-4" />
            <TextInput
              id="name"
              name="name"
              value={data.name}
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('name', e.target.value)}
            />
            <InputError className="mt-2" message={errors.name} />
          </GridItem>

          <GridItem size={6}>
            <InputLabel htmlFor="slug" value="Slug" className="mt-4" />
            <TextInput
              id="slug"
              name="slug"
              value={data.slug}
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('slug', e.target.value)}
            />
            <InputError className="mt-2" message={errors.slug} />
          </GridItem>
          <GridItem size={6}>
            <InputLabel htmlFor="status" value="Status" className="mt-4 mb-1" />
            <SelectInput
              options={[
                { label: 'Ativo', value: 'active' },
                { label: 'Inativo', value: 'inactive' },
              ]}
              value={data.status}
              onChange={(e) => setData('status', e)}
            />
          </GridItem>
          <GridItem size={6}>
            <InputLabel htmlFor="website" value="Website" className="mt-4" />
            <TextInput
              id="website"
              name="website"
              value={data.website}
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('website', e.target.value)}
            />
            <InputError className="mt-2" message={errors.website} />
          </GridItem>
        </GridContainer>
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
