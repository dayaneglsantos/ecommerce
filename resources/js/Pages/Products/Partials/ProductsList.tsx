import Card from '@/Components/Card';
import SelectInput from '@/Components/SelectInput';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import ProductType from '@/Types/ProductType';
import ProductVariationType from '@/Types/ProductVariationType';
import { UserType } from '@/Types/UserType';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

interface ProductsListProps {
  productVariations: ProductVariationType[];
  brands: BrandType[];
  categories: CategoryType[];
}

export default function ProductsList({
  productVariations,
  brands,
  categories,
}: ProductsListProps) {
  const currentUser = usePage().props.auth.user as UserType;
  const isAdmin = currentUser?.profile === 'admin';
  const [filters, setFilters] = useState({
    brand: [],
    category: [],
  });

  const brandOptions = brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-1">
          <SelectInput
            options={brandOptions}
            value={filters.brand}
            onChange={(value) => setFilters({ ...filters, brand: value })}
            multiple
            placeholder="Marca"
          />
        </div>
        <div className="col-span-1">
          <SelectInput
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => setFilters({ ...filters, category: value })}
            multiple
            placeholder="Categoria"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {productVariations.map((variant) => (
          <Card key={variant.id} className="relative col-span-1 w-full">
            <div className="h-32 border border-gray-200 rounded-md">foto</div>
            <p>{variant.product.name}</p>
            {variant.old_price && variant.old_price > variant.price ? (
              <>
                <p>
                  De R${' '}
                  <span className="line-through">{variant.old_price}</span>
                </p>
                <p>
                  por R${' '}
                  <span className="text-primary font-bold">
                    {variant.price}
                  </span>
                </p>
              </>
            ) : (
              <span className="text-primary font-bold">R${variant.price}</span>
            )}
            {isAdmin && (
              <p className="text-sm">
                Quantidade em estoque: <b>{variant.stock_quantity}</b>
              </p>
            )}
            <div className="absolute -top-2 -right-2 p-2 cursor-pointer bg-gray-100 rounded-full">
              <SlOptionsVertical />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
