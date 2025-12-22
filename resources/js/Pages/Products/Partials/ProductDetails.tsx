import ProductType from '@/Types/ProductType';
import { usePage } from '@inertiajs/react';
import { use } from 'react';

export default function ProductDetails() {
  const product = usePage().props.product as ProductType;
  return <div>Detalhes do Produto: {product.name}</div>;
}
