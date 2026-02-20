import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import { MetaType } from '@/Types/MetaType';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CategoryRuleable from './CategoryRuleable';
import ProductsRuleable from './ProductsRuleable';
import { IoClose } from 'react-icons/io5';
import { CouponRulesFormType } from '../CouponRulesForm';

interface BrandRuleableProps {
  setData: (field: string, value: any) => void;
  data: CouponRulesFormType;
  reset: () => void;
}

export default function BrandRuleable({
  setData,
  data,
  reset,
}: BrandRuleableProps) {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [brandsMeta, setBrandsMeta] = useState<MetaType | null>(null);

  const [brandSearch, setBrandSearch] = useState('');
  const [debouncedBrandSearch, setDebouncedBrandSearch] = useState(brandSearch);

  const [allBrandsItems, setAllBrandsItems] = useState(true);
  const [selectedContent, setSelectedContent] = useState<
    'category' | 'product' | null
  >(null);

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

  const handleAddBrand = (brand: BrandType) => {
    if (!data.brand.items.some((item) => item.id === brand.id)) {
      setData(`brand.items`, [...data.brand.items, brand]);
    } else {
      setData(
        `brand.items`,
        data.brand.items.filter((b: BrandType) => b.id !== brand.id)
      );
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setBrandSearch(debouncedBrandSearch);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [debouncedBrandSearch]);

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
                  className={`flex gap-3 items-center w-full cursor-pointer ${data?.brand?.items?.some((item) => item.id === brand.id) ? 'bg-primary-light' : ''}`}
                  onClick={() => handleAddBrand(brand)}
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
        {data.brand.items.length > 0 && (
          <Card className="w-full mt-6">
            <p className="font-bold text-gray-500">Itens Selecionados:</p>
            <div className="flex gap-3">
              {data.brand.items.map((item) => (
                <div
                  className="flex items-center border rounded-lg p-1 px-2 gap-1 mt-2 w-fit text-primary-dark bg-gray-100"
                  key={item.id}
                >
                  <span>{item.name}</span>
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleAddBrand(item)}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {data.brand.items.length > 0 && (
          <div className="my-6">
            <p>
              O cupom será aplicado para todos os itens das marcas selecionadas?
            </p>
            <div className="flex gap-2 w-full">
              <div className="flex items-center gap-1">
                <Checkbox
                  onChange={(e) => {
                    setAllBrandsItems(true);
                  }}
                  checked={allBrandsItems}
                />
                <InputLabel value="Sim" />
              </div>
              <div className="flex items-center gap-1">
                <Checkbox
                  onChange={(e) => {
                    setAllBrandsItems(false);
                  }}
                  checked={!allBrandsItems}
                />
                <InputLabel value="Não" />
              </div>
            </div>
          </div>
        )}

        {data.brand.items.length > 0 && !allBrandsItems && (
          <GridContainer gap={3}>
            <GridItem size={6}>
              <InputLabel className="mt-2" value="Aplicação para:" />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => {
                    setSelectedContent('category');
                  }}
                  type="button"
                >
                  <Badge
                    className="cursor-pointer font-bold"
                    type={
                      selectedContent === 'category' ? 'warning' : 'default'
                    }
                  >
                    Categorias
                  </Badge>
                </button>
                <button
                  onClick={() => {
                    setSelectedContent('product');
                  }}
                  type="button"
                >
                  <Badge
                    className="cursor-pointer font-bold"
                    type={selectedContent === 'product' ? 'warning' : 'default'}
                  >
                    Produtos
                  </Badge>
                </button>
              </div>
            </GridItem>
            {selectedContent && (
              <GridItem size={6}>
                <InputLabel className="mt-2" value="Condição" />
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => {
                      setData(`brand.rule`, 'include');
                    }}
                    type="button"
                  >
                    <Badge
                      className="cursor-pointer font-bold"
                      type={
                        data[selectedContent]?.rule === 'include'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      Inclusão
                    </Badge>
                  </button>
                  <button
                    onClick={() => {
                      setData(`${selectedContent}.rule`, 'exclude');
                    }}
                    type="button"
                  >
                    <Badge
                      className="cursor-pointer font-bold"
                      type={
                        data[selectedContent]?.rule === 'exclude'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      Exclusão
                    </Badge>
                  </button>
                </div>
              </GridItem>
            )}
          </GridContainer>
        )}

        {selectedContent === 'category' && (
          <CategoryRuleable setData={setData} data={data} reset={reset} />
        )}
        {selectedContent === 'product' && (
          <ProductsRuleable setData={setData} data={data} reset={reset} />
        )}
      </Card>
    </div>
  );
}
