import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { IoMdInformationCircle } from 'react-icons/io';

export default function ProductForm({ brands, categories }: any) {
  const { data, setData, reset, post, errors } = useForm({
    name: '',
    full_description: '',
    brand_id: '',
    category_id: '',
    slug: '',
    description: '',
  });

  console.log(errors);
  console.log(data);

  const createProduct = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('products.store'), {
      onSuccess: () => reset(),
    });
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

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
      <form onSubmit={createProduct}>
        <div>
          <InputLabel htmlFor="name" value="Nome do Produto" className="mt-4" />
          <TextInput
            id="name"
            name="name"
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
        <div className="flex gap-3 mt-5 justify-end">
          <PrimaryButton outline type="submit">
            Salvar
          </PrimaryButton>
          <PrimaryButton type="button">
            Salvar e criar variação deste produto
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
