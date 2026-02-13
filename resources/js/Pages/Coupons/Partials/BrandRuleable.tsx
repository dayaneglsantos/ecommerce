import Card from '@/Components/Card';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import { MetaType } from '@/Types/MetaType';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [brandsMeta, setBrandsMeta] = useState<MetaType | null>(null);

  const [brandSearch, setBrandSearch] = useState('');
  const [debouncedBrandSearch, setDebouncedBrandSearch] = useState(brandSearch);

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
    </div>
  );
}
