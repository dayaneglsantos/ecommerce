import Card from '@/Components/Card';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Textarea } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';

export default function ProductForm() {
  const { setData, reset, post } = useForm({
    name: '',
  });

  const createProduct = () => {
    console.log('Criar produto');
  };

  return (
    <AuthenticatedLayout>
      <Head title="Criar produto" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <Card className="w-full">
            <h3>Inclusão de novo produto</h3>

            <form>
              <InputLabel
                htmlFor="name"
                value="Nome do Produto"
                className="mt-4"
              />
              <TextInput
                id="name"
                name="name"
                type="text"
                className="mt-1 block w-full"
              />

              <Editor
                apiKey={import.meta.env.VITE_TINY_API_KEY}
                init={{
                  branding: false,
                  placeholder: 'Descrição do produto...',
                  menubar: false,
                }}
              />
            </form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
