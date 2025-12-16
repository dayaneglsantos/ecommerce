import Card from '@/Components/Card';
import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import ProductType from '@/Types/ProductType';
import { router, useForm, usePage } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';

export default function ProductForm({ brands, categories }: any) {
  const product = usePage().props.product as ProductType;
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { data, setData, reset, post, errors, patch } = useForm({
    name: product?.name || '',
    full_description: product?.fullDescription || '',
    brand_id: product?.brand?.id || 0,
    category_id: product?.category?.id || 0,
    slug: product?.slug || '',
    description: product?.description || '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      patch(route('products.update', product.id), {
        onSuccess: () => reset(),
      });
    } else {
      post(route('products.store'), {
        onSuccess: () => reset(),
      });
    }
  };

  const handleFilePicker = (cb: any, value: any, meta: any) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');

    if (meta.filetype === 'image') {
      input.setAttribute('accept', 'image/*');
    } else if (meta.filetype === 'media') {
      input.setAttribute('accept', 'video/*');
    } else {
      return;
    }

    input.onchange = (e: any) => {
      const file = e?.target?.files?.[0]; // Arquivo selecionado
      const reader = new FileReader(); // Leitor de arquivos

      reader.onload = () => {
        const id = 'blobid' + new Date().getTime(); // ID único para o blob
        const blobCache = (window as any).tinymce.activeEditor.editorUpload
          .blobCache; // Cache de blobs do TinyMCE
        const base64 = (reader.result as string).split(',')[1]; // Dados em base64
        const blobInfo = blobCache.create(id, file, base64); // Criar o blob
        blobCache.add(blobInfo); // Adicionar ao cache

        cb(blobInfo.blobUri(), { title: file.name }); // Chamar o callback do TinyMCE
      };
      reader.readAsDataURL(file); // Ler o arquivo como Data URL
    };

    input.click();
  };

  const brandsOptions = brands?.map((brand: any) => ({
    label: brand.name,
    value: brand.id,
  }));

  const categoriesOptions = categories?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  const handleDeleteProduct = (productId: number) => {
    router.delete(route('products.destroy', productId), {
      onSuccess: () => {
        setDeleteConfirmation(false);
      },
    });
  };

  return (
    <Card className="w-full mb-3 relative">
      <h3 className="font-bold text-lg text-primaryDark">Produto Principal</h3>
      <button
        type="button"
        onClick={() => {
          setDeleteConfirmation(true);
        }}
        className="absolute top-4 right-4"
      >
        <FaTrashAlt
          data-tooltip-id="delete"
          className={`cursor-pointer text-gray-500 outline-none hover:text-red-600`}
        />
        <Tooltip
          id="delete"
          place="top"
          content="Excluir"
          className="!p-2 !text-[12px]"
        />
      </button>
      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Nome do Produto" className="mt-4" />
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
          <InputLabel
            htmlFor="slug"
            value="Slug do Produto"
            className="mt-4"
            icon={<IoMdInformationCircle />}
            iconText="Texto amigável para URL"
          />
          <TextInput
            id="slug"
            name="slug"
            value={data.slug}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('slug', e.target.value)}
          />
          <InputError className="mt-2" message={errors.slug} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <InputLabel htmlFor="brand" value="Marca" className="mt-4" />
            <SelectInput
              options={brandsOptions}
              value={data.brand_id}
              onChange={(e) => {
                setData('brand_id', e);
              }}
            />
            <InputError className="mt-2" message={errors.brand_id} />
          </div>
          <div className="col-span-1">
            <InputLabel htmlFor="category" value="Categoria" className="mt-4" />
            <SelectInput
              options={categoriesOptions}
              value={data.category_id}
              onChange={(e) => setData('category_id', e)}
            />
            <InputError className="mt-2" message={errors.category_id} />
          </div>
        </div>
        <div>
          <InputLabel
            htmlFor="description"
            value="Descrição Resumida"
            className="mt-4"
            icon={<IoMdInformationCircle />}
            iconText="Descrição apresentada em listas e resumos."
          />
          <TextInput
            id="description"
            name="description"
            value={data.description}
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('description', e.target.value)}
          />
          <InputError className="mt-2" message={errors.description} />
        </div>
        <div className="mt-3">
          <InputLabel
            htmlFor="full_description"
            value="Descrição Completa"
            className="mt-4"
          />
          <Editor
            id="full_description"
            apiKey={import.meta.env.VITE_TINY_API_KEY}
            onEditorChange={(content) => {
              setData('full_description', content);
            }}
            value={data.full_description}
            init={{
              height: 400,
              branding: false,
              placeholder: 'Descrição do produto...',
              menubar: false,
              language: 'pt-BR',
              elementpath: false,
              plugins: ['link', 'lists', 'table', 'paste', 'image', 'media'],
              toolbar:
                'undo redo | blocks | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
              file_picker_types: 'image media',
              file_picker_callback: (cb: any, value: any, meta: any) =>
                handleFilePicker(cb, value, meta),
            }}
          />
          <InputError className="mt-2" message={errors.full_description} />
        </div>
        <div className="flex justify-end my-3 mt-6">
          <PrimaryButton>Salvar</PrimaryButton>
        </div>
      </form>
      <ConfirmDialog
        open={deleteConfirmation}
        title="Tem certeza que deseja remover este produto?"
        description="Todas as variações também serão excluidas."
        onAccept={() => handleDeleteProduct(product.id)}
        onClose={() => {
          setDeleteConfirmation(false);
        }}
      />
    </Card>
  );
}
