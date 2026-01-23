import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import CategoryType from '@/Types/CategoryType';
import { Switch } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Grid } from 'swiper/modules';

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryFormModal({
  open,
  onClose,
}: CategoryFormModalProps) {
  const [isSubcategory, setIsSubcategory] = useState(false);

  const categories = usePage().props.categories as CategoryType[];
  const categoriesOptions = categories.map((category: CategoryType) => ({
    value: category.id,
    label: category.name,
  }));

  const { data, setData, errors } = useForm({
    name: '',
    slug: '',
    description: '',
    parent_id: 0,
  });

  console.log('category data', data);

  return (
    <Modal show={open} onClose={onClose}>
      <span>Ativo</span>
      <Switch
        checked={isSubcategory}
        onChange={() => setIsSubcategory(!isSubcategory)}
        className="relative h-7 w-14 bg-gray-500 rounded-xl focus:outline-none"
      >
        <span className="bg-white h-6 w-6 rounded-full absolute left-0 top-0.5" />
      </Switch>

      <form>
        <GridContainer>
          <GridItem size={12}>
            <InputLabel htmlFor="name" value="Nome da Categoria" />
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
          <GridItem size={12}>
            <InputLabel htmlFor="description" value="Descrição" />
            <TextInput
              id="description"
              name="description"
              value={data.description}
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('description', e.target.value)}
            />
            <InputError className="mt-2" message={errors.description} />
          </GridItem>
          <GridItem size={12}>
            <InputLabel htmlFor="slug" value="Slug" />
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

          <GridItem size={12}>
            <p className="w-full">Essa categoria é uma subcategoria?</p>
            <InputLabel htmlFor="parent_id" value="Categoria Pai" />
            <SelectInput
              options={categoriesOptions}
              value={data.parent_id}
              onChange={(e) => setData('parent_id', e)}
            />
            <InputError className="mt-2" message={errors.parent_id} />
          </GridItem>
        </GridContainer>
      </form>
    </Modal>
  );
}
