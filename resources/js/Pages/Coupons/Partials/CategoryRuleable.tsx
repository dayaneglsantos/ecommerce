import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Loader from '@/Components/Loader';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import { MetaType } from '@/Types/MetaType';
import ProductType from '@/Types/ProductType';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface CategoryRuleableProps {
  setData: (field: string, value: any) => void;
  data: any;
  reset: () => void;
}

export default function CategoryRuleable({
  setData,
  data,
  reset,
}: CategoryRuleableProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesMeta, setCategoriesMeta] = useState<MetaType | null>(null);
  const [categoryExceptions, setCategoryExceptions] = useState<CategoryType[]>(
    []
  );
  const [isLoaded, setLoaded] = useState(false);

  // Filtros
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  const [debouncedProductSearch, setDebouncedProductSearch] =
    useState(productSearch);
  const [debouncedCategorySearch, setDebouncedCategorySearch] =
    useState(categorySearch);

  const fetchCategories = async (url?: string) => {
    setLoaded(false);
    try {
      const { data } = await axios.get(url || route('categories.list'), {
        params: { search: categorySearch, pageSize: 10 },
      });
      setCategories(data.data);
      setCategoriesMeta(data.meta);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoaded(true);
    }
  };

  const handleAddCategoryException = (category: CategoryType) => {
    const alreadySelected = categoryExceptions.some(
      (exception) => exception.id === category.id
    );

    if (alreadySelected) {
      setCategoryExceptions(
        categoryExceptions.filter((exception) => exception.id !== category.id)
      );

      // Excluindo no formulário
      const filteredExceptions = data.items.filter(
        (item: any) =>
          !(
            item.ruleable.type === 'category' &&
            item.ruleable.id === category.id
          )
      );

      setData('items', filteredExceptions);
    } else {
      setCategoryExceptions([...categoryExceptions, category]);

      // Incluindo no formulário
      setData('items', [
        ...data.items,
        {
          ruleable: {
            type: 'category',
            id: category.id,
          },
          condition: 'exclude',
        },
      ]);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setProductSearch(debouncedProductSearch);
      setCategorySearch(debouncedCategorySearch);
    }, 500);

    return () => clearTimeout(delay);
  }, [debouncedCategorySearch]);

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [categorySearch]);

  return (
    <Card className="w-full mt-6">
      <div className="mb-6 w-6/12">
        <InputLabel htmlFor="search" value="Buscar categoria" />
        <TextInput
          id="search"
          placeholder="Buscar por nome..."
          type="text"
          value={debouncedCategorySearch}
          onChange={(e) => setDebouncedCategorySearch(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>
      {!isLoaded && <Loader />}
      {categories.length === 0 && isLoaded && (
        <p className="italic text-center text-gray-400 my-6">
          Nenhuma categoria encontrada.
        </p>
      )}
      {categories.length > 0 && isLoaded && (
        <GridContainer className="mb-6">
          {categories.map((category) => (
            <GridItem size={3}>
              <Card
                className={`w-full text-sm cursor-pointer ${categoryExceptions.some((exception) => exception.id === category.id) ? 'bg-primary-light' : ''}`}
                onClick={() => handleAddCategoryException(category)}
              >
                <p
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                  title={category.name}
                >
                  {category.name}
                </p>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      )}
      {categoriesMeta && (
        <Pagination
          links={categoriesMeta.links}
          onNavigate={(url) => fetchCategories(url)}
        />
      )}

      {categoryExceptions.length > 0 && (
        <Card className="w-full mt-6">
          <p className="font-bold text-gray-500">Itens Selecionados:</p>
          <div className="flex gap-3">
            {categoryExceptions.map((item) => (
              <div
                className="flex items-center border rounded-lg p-1 px-2 gap-1 mt-2 w-fit text-primary-dark bg-gray-100"
                key={item.id}
              >
                <span>{item.name}</span>
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => handleAddCategoryException(item)}
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Card>
  );
}
