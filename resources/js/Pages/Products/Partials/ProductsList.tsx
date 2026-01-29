import Card from '@/Components/Card';
import Carousel from '@/Components/Carousel';
import { GridContainer, GridItem } from '@/Components/Grid';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import ProductType from '@/Types/ProductType';
import { UserType } from '@/Types/UserType';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import ProductEntrieModal from '../../ProductStockEntrie/ProductEntrieFormModal';
import { GiHandTruck } from 'react-icons/gi';
import { Tooltip } from 'react-tooltip';
import { LuPackagePlus } from 'react-icons/lu';

export default function ProductsList() {
  const currentUser = usePage().props.auth.user as UserType;
  const products = usePage().props.products as ProductType[];
  const brands = usePage().props.brands as BrandType[];
  const categories = usePage().props.categories as CategoryType[];

  const [openEntrieModal, setOpenEntrieModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [filters, setFilters] = useState({
    brand: [],
    category: [],
  });

  const brandOptions = brands?.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));

  const categoryOptions = categories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <>
      <GridContainer gap={3} className="mb-6">
        <GridItem size={4} smSize={12}>
          <SelectInput
            options={brandOptions}
            value={filters.brand}
            onChange={(value) => setFilters({ ...filters, brand: value })}
            multiple
            placeholder="Marca"
            resetSelected={() => setFilters({ ...filters, brand: [] })}
          />
        </GridItem>
        <GridItem size={4} smSize={12}>
          <SelectInput
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => setFilters({ ...filters, category: value })}
            multiple
            placeholder="Categoria"
            resetSelected={() => setFilters({ ...filters, category: [] })}
          />
        </GridItem>
      </GridContainer>
      <GridContainer gap={3}>
        {products.map((product: ProductType) => (
          <GridItem key={product.id} size={4} smSize={12} mdSize={6}>
            <Card key={product.id} className="relative w-full">
              {/* <Carousel images={product.defaultVariation.images} /> */}
              <p>{product.name}</p>

              <span className="font-bold">Preço atual: </span>
              <span className="text-primary font-bold">
                {/* R${product.defaultVariation.price} */}
              </span>

              <p className="text-sm">
                Variações cadastradas: <b>{product?.variations.length}</b>
              </p>
              <div className="flex justify-between gap-2 items-center">
                <PrimaryButton outline className="mt-2 w-full justify-center">
                  <Link href={route('products.show', product.id)}>
                    Ver detalhes
                  </Link>
                </PrimaryButton>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setOpenEntrieModal(true);
                  }}
                  className="rounded-full p-1 bg-gray-100"
                >
                  <Tooltip
                    id="product-entrie"
                    place="top"
                    content="Registrar entrada"
                    className="!p-2 !text-[12px]"
                  />
                  <LuPackagePlus
                    data-tooltip-id="product-entrie"
                    className="text-xl"
                  />
                </button>
              </div>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
      {selectedProduct && (
        <ProductEntrieModal
          open={openEntrieModal}
          onClose={() => {
            setOpenEntrieModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </>
  );
}
