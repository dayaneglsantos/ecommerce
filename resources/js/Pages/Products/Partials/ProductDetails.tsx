import Sidebar from '@/Components/Aside';
import Carousel from '@/Components/Carousel';
import ProductType from '@/Types/ProductType';
import ProductVariationType from '@/Types/ProductVariationType';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductDetails() {
  const product = usePage().props.product as ProductType;
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariationType>();

  return (
    <div className="flex">
      <Sidebar position="right">Conteúdo do sidebar</Sidebar>
      <div className="w-[calc(100%-340px)] ">
        <p className="text-lg font-medium mt-2">{product.name}</p>
        <p
          dangerouslySetInnerHTML={{ __html: product.fullDescription }}
          className="my-3"
        />
        <div>
          {Object.entries(product.technicalSpecifications || {}).map(
            ([key, value]) => (
              <p key={key}>
                {key}: <span className="italic">{value}</span>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
