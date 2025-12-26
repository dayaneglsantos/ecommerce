import Sidebar from '@/Components/Aside';
import ProductType from '@/Types/ProductType';
import { usePage } from '@inertiajs/react';

export default function ProductDetails() {
  const product = usePage().props.product as ProductType;
  return (
    <div className="relative">
      <div>Content</div>
      <Sidebar position="right">Conteúdo do aside</Sidebar>
    </div>
  );
}
