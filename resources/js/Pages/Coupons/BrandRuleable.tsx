import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import { MetaType } from '@/Types/MetaType';
import ProductType from '@/Types/ProductType';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface BrandRuleableProps {
  setData: (field: string, value: any) => void;
  data: any;
  reset: () => void;
}

export default function BrandRuleable({
  setData,
  data,
  reset,
}: BrandRuleableProps) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsMeta, setProductsMeta] = useState<MetaType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesMeta, setCategoriesMeta] = useState<MetaType | null>(null);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [brandsMeta, setBrandsMeta] = useState<MetaType | null>(null);

  const [hasExceptions, setHasExceptions] = useState(false);
  const [exceptionType, setExceptionType] = useState('');
  const [categoryExceptions, setCategoryExceptions] = useState<CategoryType[]>(
    []
  );
  const [hasCategoryExceptions, setHasCategoryExceptions] = useState(false);
  const [productExceptions, setProductExceptions] = useState<ProductType[]>([]);

  // Filtros
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [debouncedProductSearch, setDebouncedProductSearch] =
    useState(productSearch);
  const [debouncedCategorySearch, setDebouncedCategorySearch] =
    useState(categorySearch);
  const [debouncedBrandSearch, setDebouncedBrandSearch] = useState(brandSearch);

  const fetchProducts = async (url?: string) => {
    try {
      const { data } = await axios.get(url || route('products.list'), {
        params: { search: productSearch, pageSize: 10 },
      });
      setProducts(data.data);
      setProductsMeta(data.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchCategories = async (url?: string) => {
    try {
      const { data } = await axios.get(url || route('categories.list'), {
        params: { search: categorySearch, pageSize: 10 },
      });
      setCategories(data.data);
      setCategoriesMeta(data.meta);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchBrands = async (url?: string) => {
    try {
      const { data } = await axios.get(url || route('brands.list'), {
        params: { search: brandSearch, pageSize: 10 },
      });
      setBrands(data.data);
      setBrandsMeta(data.meta);
    } catch (error) {
      console.error('Error fetching brands:', error);
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

  const handleAddProduct = (
    product: ProductType,
    condition: 'include' | 'exclude'
  ) => {
    const alreadySelected = productExceptions.some(
      (exception) => exception.id === product.id
    );

    if (alreadySelected) {
      setProductExceptions(
        productExceptions.filter((exception) => exception.id !== product.id)
      );

      // Excluindo no formulário
      const filteredExceptions = data.items.filter(
        (item: any) =>
          !(item.ruleable.type === 'product' && item.ruleable.id === product.id)
      );

      setData('items', filteredExceptions);
    } else {
      setProductExceptions([...productExceptions, product]);

      // Incluindo no formulário
      setData('items', [
        ...data.items,
        {
          ruleable: {
            type: 'product',
            id: product.id,
          },
          condition: condition,
        },
      ]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setProductSearch(debouncedProductSearch);
      setCategorySearch(debouncedCategorySearch);
      setBrandSearch(debouncedBrandSearch);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [debouncedProductSearch, debouncedCategorySearch, debouncedBrandSearch]);

  useEffect(() => {
    fetchProducts();
  }, [productSearch]);

  useEffect(() => {
    fetchCategories();
  }, [categorySearch]);

  useEffect(() => {
    fetchBrands();
  }, [brandSearch]);

  return (
    <div>
      <Card className="my-6 w-full">
        <div className="mb-6 w-6/12">
          <InputLabel htmlFor="search" value="Buscar marca" />
          <TextInput
            id="search"
            placeholder="Buscar por nome..."
            type="text"
            value={debouncedBrandSearch}
            onChange={(e) => setDebouncedBrandSearch(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        {brands.length === 0 && (
          <p className="italic text-center text-gray-400 my-6">
            Nenhuma marca encontrada.
          </p>
        )}
        {brands.length > 0 && (
          <GridContainer className="mb-6">
            {brands.map((brand) => (
              <GridItem size={4}>
                <Card
                  className={`flex gap-3 items-center w-full cursor-pointer ${data.items[0]?.ruleable.id === brand.id ? 'bg-primary-light' : ''}`}
                  onClick={() => setData(`items.0.ruleable.id`, brand.id)}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <span>{brand.name}</span>
                </Card>
              </GridItem>
            ))}
          </GridContainer>
        )}
        {brandsMeta && (
          <Pagination
            links={brandsMeta.links}
            onNavigate={(url) => fetchBrands(url)}
          />
        )}
      </Card>

      {/* Selecionado o item de inclusão - pergunta se haverá exceções */}
      {data.items[0]?.ruleable.id && (
        <>
          <p className="text-gray-700">
            Cupom será aplicado para todos os produtos da marca selecionada?
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasExceptions(false);
                }}
                checked={!hasExceptions}
              />
              <InputLabel value="Sim" />
            </div>
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasExceptions(true);
                }}
                checked={hasExceptions}
              />
              <InputLabel value="Não" />
            </div>
          </div>
        </>
      )}

      {/* Seleciona o tipo de exceção (caso haja) */}
      {hasExceptions && (
        <div className="my-6">
          <InputLabel className="mt-2" value="Selecione qual será a exceção:" />
          <div className="flex gap-3 mt-2">
            <button onClick={() => setExceptionType('category')} type="button">
              <Badge
                className="cursor-pointer font-bold"
                type={exceptionType === 'category' ? 'warning' : 'default'}
              >
                Categorias
              </Badge>
            </button>
            <button onClick={() => setExceptionType('product')} type="button">
              <Badge
                className="cursor-pointer font-bold"
                type={exceptionType === 'product' ? 'warning' : 'default'}
              >
                Produto
              </Badge>
            </button>
          </div>
        </div>
      )}

      {/* ==================== Exclusão de produto ====================*/}

      {exceptionType === 'product' && (
        <Card>
          <div className="mb-6 w-6/12">
            <InputLabel htmlFor="search" value="Buscar produto" />
            <TextInput
              id="search"
              placeholder="Buscar por nome..."
              type="text"
              value={debouncedProductSearch}
              onChange={(e) => setDebouncedProductSearch(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          {products.length === 0 && (
            <p className="italic text-center text-gray-400 my-6">
              Nenhum produto encontrado.
            </p>
          )}
          {products.length > 0 && (
            <GridContainer className="mb-6">
              {products.map((product) => (
                <GridItem size={3}>
                  <Card
                    className={`flex items-center w-full text-sm cursor-pointer ${productExceptions.some((exception) => exception.id === product.id) ? 'bg-primary-light' : ''}`}
                    onClick={() => handleAddProduct(product, 'exclude')}
                  >
                    <img
                      src={product?.images[0]?.url}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg"
                    />
                    <span>{product.name}</span>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          )}
          {productsMeta && (
            <Pagination
              links={productsMeta.links}
              onNavigate={(url) => fetchProducts(url)}
            />
          )}
        </Card>
      )}
      {/* ==================== FIM - Exclusão de produto ====================*/}

      {/* ==================== Exclusão de categorias ====================*/}
      {exceptionType === 'category' && (
        <Card className="w-full">
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
          {categories.length === 0 && (
            <p className="italic text-center text-gray-400 my-6">
              Nenhuma categoria encontrada.
            </p>
          )}
          {categories.length > 0 && (
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
      )}

      {categoryExceptions.length > 0 && (
        <div className="my-6">
          <p>
            Todos os produtos das categorias selecionadas serão excluídos do
            cupom?
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasCategoryExceptions(false);
                }}
                checked={!hasCategoryExceptions}
              />
              <InputLabel value="Sim" />
            </div>
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasCategoryExceptions(true);
                }}
                checked={hasCategoryExceptions}
              />
              <InputLabel value="Não" />
            </div>
          </div>
        </div>
      )}
      {/* ==================== FIM - Exclusão de categorias ====================*/}

      {/* ==================== Reinclusão de produtos quando houver exceção de categoria ====================*/}
      {exceptionType === 'category' &&
        hasCategoryExceptions &&
        categoryExceptions.length > 0 && (
          <Card className="w-full">
            <div className="mb-6 w-6/12">
              <InputLabel htmlFor="search" value="Buscar produto" />
              <TextInput
                id="search"
                placeholder="Buscar por nome..."
                type="text"
                value={debouncedProductSearch}
                onChange={(e) => setDebouncedProductSearch(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            {products.length === 0 && (
              <p className="italic text-center text-gray-400 my-6">
                Nenhum produto encontrado.
              </p>
            )}
            {products.length > 0 && (
              <GridContainer>
                {products.map((product) => (
                  <GridItem size={3}>
                    <Card
                      className={`w-full text-sm cursor-pointer ${productExceptions.some((exception) => exception.id === product.id) ? 'bg-primary-light' : ''}`}
                      onClick={() => handleAddProduct(product, 'include')}
                    >
                      <span>{product.name}</span>
                    </Card>
                  </GridItem>
                ))}
              </GridContainer>
            )}
            {productsMeta && (
              <Pagination
                links={productsMeta.links}
                onNavigate={(url) => fetchProducts(url)}
              />
            )}
          </Card>
        )}
      {/* ==================== FIM - Reinclusão de produtos quando houver exceção de categoria ====================*/}
    </div>
  );
}
