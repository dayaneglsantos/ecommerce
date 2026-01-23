import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import CategoryType from '@/Types/CategoryType';
import { Switch } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Grid } from 'swiper/modules';

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
  category?: CategoryType | null;
}

export default function CategoryFormModal({
  open,
  onClose,
  category,
}: CategoryFormModalProps) {
  const [isSubcategory, setIsSubcategory] = useState(false);

  const categories = usePage().props.categories as CategoryType[];
  const categoriesOptions = categories.map((category: CategoryType) => ({
    value: category.id,
    label: category.name,
  }));

  const { data, setData, errors, post } = useForm({
    name: '',
    slug: '',
    description: '',
    parent_id: 0,
    active: true,
  });

  useEffect(() => {
    if (category) {
      setData('name', category.name || '');
      setData('slug', category.slug || '');
      setData('description', category.description || '');
      setData('parent_id', category.parent_id || 0);
      setData('active', category.active || false);

      setIsSubcategory(!!category.parent_id);
    }
  }, [category]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (category) {
      // Lógica para atualizar a categoria existente
    } else {
      // Lógica para criar uma nova categoria
    }
  };

  console.log('category data', data);

  return (
    <Modal show={open} onClose={onClose}>
      <div className="flex gap-2 justify-end items-center mb-4">
        <span>{data.active ? 'Ativo' : 'Inativo'}</span>
        <Switch
          checked={data.active}
          onChange={() => setData('active', !data.active)}
          className="relative h-[22px] w-10 border border-gray-400 bg-gray-50 rounded-xl focus:outline-none"
        >
          <span
            className={`bg-primary-dark h-4 w-4 rounded-full absolute ${data.active ? 'left-5' : 'left-1'} top-0.5 transition-all ease-in-out duration-300`}
          />
        </Switch>
      </div>

      <form>
        <GridContainer>
          <GridItem size={12}>
            <div className="flex gap-3 items-center mb-2">
              <span className="text-gray-800 font-medium">
                Essa categoria é uma subcategoria?
              </span>
              <Checkbox
                onChange={(e) => {
                  setIsSubcategory(e.target.checked);
                }}
                checked={isSubcategory}
              />
            </div>
            {isSubcategory && (
              <>
                <InputLabel htmlFor="parent_id" value="Categoria Pai" />
                <SelectInput
                  options={categoriesOptions}
                  value={data.parent_id}
                  onChange={(e) => setData('parent_id', e)}
                />
                <InputError className="mt-2" message={errors.parent_id} />
              </>
            )}
          </GridItem>
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
        </GridContainer>
        <div className="flex justify-end gap-3 mt-4">
          <PrimaryButton type="button" outline>
            Cancelar
          </PrimaryButton>
          <PrimaryButton type="submit" onClick={submit}>
            Salvar
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
