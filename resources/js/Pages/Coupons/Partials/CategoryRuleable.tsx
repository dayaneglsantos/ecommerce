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
import { CouponRulesFormType } from '../CouponRulesForm';
import ProductsRuleable from './ProductsRuleable';

interface CategoryRuleableProps {
  setData: (field: string, value: any) => void;
  data: CouponRulesFormType;
  reset: () => void;
}

export default function CategoryRuleable({
  setData,
  data,
  reset,
}: CategoryRuleableProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesMeta, setCategoriesMeta] = useState<MetaType | null>(null);

  const [isLoaded, setLoaded] = useState(false);

  const [allCategoriesItems, setAllCategoriesItems] = useState(true);

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
    const alreadySelected = data.category.items.some(
      (exception) => exception.id === category.id
    );

    if (alreadySelected) {
      const filteredExceptions = data.category.items.filter(
        (item: any) => item.id !== category.id
      );

      setData('category.items', filteredExceptions);
    } else {
      setData('category.items', [...data.category.items, category]);
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
                className={`w-full text-sm cursor-pointer ${data.category.items.some((exception) => exception.id === category.id) ? 'bg-primary-light' : ''}`}
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

      {data.category.items.length > 0 && (
        <Card className="w-full mt-6">
          <p className="font-bold text-gray-500">Itens Selecionados:</p>
          <div className="flex gap-3">
            {data.category.items.map((item) => (
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

      {data.category.items.length > 0 && (
        <div className="my-6">
          <p>
            O cupom será aplicado para todos os itens das categorias
            selecionadas?
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setAllCategoriesItems(true);
                }}
                checked={allCategoriesItems}
              />
              <InputLabel value="Sim" />
            </div>
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setAllCategoriesItems(false);
                }}
                checked={!allCategoriesItems}
              />
              <InputLabel value="Não" />
            </div>
          </div>
        </div>
      )}

      {data.category.items.length > 0 && !allCategoriesItems && (
        <>
          <GridContainer gap={3}>
            <GridItem size={6}>
              <InputLabel className="mt-2" value="Aplicação para:" />
              <div className="flex gap-3 mt-2">
                <Badge className="cursor-pointer font-bold" type={'warning'}>
                  Produtos
                </Badge>
              </div>
            </GridItem>
            <GridItem size={6}>
              <InputLabel className="mt-2" value="Condição" />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => {
                    setData(`product.rule`, 'include');
                  }}
                  type="button"
                >
                  <Badge
                    className="cursor-pointer font-bold"
                    type={
                      data.product?.rule === 'include' ? 'warning' : 'default'
                    }
                  >
                    Inclusão
                  </Badge>
                </button>
                <button
                  onClick={() => {
                    setData(`product.rule`, 'exclude');
                  }}
                  type="button"
                >
                  <Badge
                    className="cursor-pointer font-bold"
                    type={
                      data.product?.rule === 'exclude' ? 'warning' : 'default'
                    }
                  >
                    Exclusão
                  </Badge>
                </button>
              </div>
            </GridItem>
          </GridContainer>
          <ProductsRuleable setData={setData} data={data} reset={reset} />
        </>
      )}
    </Card>
  );
}
