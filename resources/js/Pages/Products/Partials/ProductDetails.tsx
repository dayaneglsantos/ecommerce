import Aside from '@/Components/Aside';
import ProductType from '@/Types/ProductType';
import { usePage } from '@inertiajs/react';
import { use } from 'react';

export default function ProductDetails() {
  const product = usePage().props.product as ProductType;
  return (
    <div className="relative">
      <div>Content</div>
      <Aside position="right">Conteúdo do aside</Aside>
    </div>
  );
}
