import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Loader from '@/Components/Loader';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import { MetaType } from '@/Types/MetaType';
import ProductType from '@/Types/ProductType';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

interface ProductsRuleableProps {
  setData: (field: string, value: any) => void;
  data: any;
  reset: () => void;
}

export default function ProductsRuleable({
  setData,
  data,
  reset,
}: ProductsRuleableProps) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsMeta, setProductsMeta] = useState<MetaType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoriesMeta, setCategoriesMeta] = useState<MetaType | null>(null);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [brandsMeta, setBrandsMeta] = useState<MetaType | null>(null);
  const [isLoaded, setLoaded] = useState(false);

  const firstRender = useRef(true);

  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    search: '',
  });

  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  // Filtros

  const [categorySearch, setCategorySearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [debouncedProductSearch, setDebouncedProductSearch] = useState(
    filters.search
  );
  const [debouncedCategorySearch, setDebouncedCategorySearch] =
    useState(categorySearch);
  const [debouncedBrandSearch, setDebouncedBrandSearch] = useState(brandSearch);

  const categoryOptions = categories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const brandOptions = brands?.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));

  const fetchProducts = async (url?: string) => {
    try {
      setLoaded(false);
      const { data } = await axios.get(url || route('products.list'), {
        params: {
          brand: filters.brand,
          category: filters.category,
          search: filters?.search,
          pageSize: 10,
        },
      });
      setProducts(data.data);
      setProductsMeta(data.meta);
    } catch (error) {
      toast.error('Erro ao buscar produtos');
    } finally {
      setLoaded(true);
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

  const handleAddProduct = (
    product: ProductType,
    condition: 'include' | 'exclude'
  ) => {
    const alreadySelected = selectedProducts.some(
      (selected) => selected.id === product.id
    );

    if (alreadySelected) {
      setSelectedProducts(
        selectedProducts.filter((selected) => selected.id !== product.id)
      );

      // Excluindo no formulário
      const filteredExceptions = data.items.filter(
        (item: any) =>
          !(item.ruleable.type === 'product' && item.ruleable.id === product.id)
      );

      setData('items', filteredExceptions);
    } else {
      setSelectedProducts([...selectedProducts, product]);

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
      setFilters({ ...filters, search: debouncedProductSearch });
      setCategorySearch(debouncedCategorySearch);
      setBrandSearch(debouncedBrandSearch);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [debouncedProductSearch, debouncedCategorySearch, debouncedBrandSearch]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, [categorySearch]);

  useEffect(() => {
    fetchBrands();
  }, [brandSearch]);

  return (
    <div>
      <Card className="w-full mt-6">
        <GridContainer className="mb-6">
          <GridItem size={4}>
            <InputLabel htmlFor="search" value="Buscar produto" />
            <TextInput
              id="search"
              placeholder="Buscar por nome..."
              type="text"
              value={debouncedProductSearch}
              onChange={(e) => setDebouncedProductSearch(e.target.value)}
              className="mt-1 block w-full"
            />
          </GridItem>
          <GridItem size={4}>
            <InputLabel value="Marcas" className="mb-1" />
            <SelectInput
              options={brandOptions}
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e })}
              placeholder="Marca"
            />
          </GridItem>
          <GridItem size={4}>
            <InputLabel value="Categorias" className="mb-1" />
            <SelectInput
              options={categoryOptions}
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e })}
              placeholder="Categoria"
            />
          </GridItem>
        </GridContainer>
        {!isLoaded && <Loader />}
        {products.length === 0 && isLoaded && (
          <p className="italic text-center text-gray-400 py-12">
            Nenhum produto encontrado.
          </p>
        )}
        {isLoaded && products.length > 0 && (
          <GridContainer className="mb-6">
            {products.map((product) => (
              <GridItem size={4}>
                <Card
                  className={`w-full text-sm cursor-pointer ${selectedProducts.some((selected) => selected.id === product.id) ? 'bg-primary-light' : ''}`}
                  onClick={() => handleAddProduct(product, 'include')}
                >
                  <div className="flex items-center gap-2">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-20 h-20 rounded-md shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-400 rounded-md text-center text-xs shrink-0">
                        Sem imagem
                      </div>
                    )}
                    <div>
                      <p className=" text-gray-700" title={product.name}>
                        {product.name}
                      </p>
                      <p
                        className="line-clamp-1 text-gray-500 text-xs"
                        title={product.brand.name}
                      >
                        Marca:{product.brand.name}
                      </p>
                    </div>
                  </div>
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
        {selectedProducts.length > 0 && (
          <Card className="w-full mt-6">
            <p className="font-bold text-gray-500">Itens Selecionados:</p>
            <div className="flex gap-3 flex-wrap">
              {selectedProducts.map((item) => (
                <div
                  className="flex items-center border rounded-lg p-2  gap-2 mt-2 w-fit text-primary-dark bg-gray-100"
                  key={item.id}
                >
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-20 rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-400 rounded-md text-center text-xs">
                      Sem imagem
                    </div>
                  )}
                  <span className="w-28 line-clamp-2 text-sm" title={item.name}>
                    {item.name}
                  </span>
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700 self-start"
                    onClick={() => handleAddProduct(item, 'include')}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}
