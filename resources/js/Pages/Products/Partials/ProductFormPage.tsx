import BrandType from '@/Types/BrandType';
import ProductForm from './Form/ProductForm';
import ProductVariationForm from './Form/ProductVariationForm';
import CategoryType from '@/Types/CategoryType';
import SupplierType from '@/Types/SupplierType';
import ProductType from '@/Types/ProductType';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductFormPage() {
  const product = usePage().props.product as ProductType | null;
  const brands = usePage().props.brands as BrandType[];
  const categories = usePage().props.categories as CategoryType[];
  const suppliers = usePage().props.suppliers as SupplierType[];

  const [newForm, setNewForm] = useState(false);

  const disabledVariationButton = product === undefined || newForm;

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
      <ProductForm brands={brands} categories={categories} />
      <button
        type="button"
        className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold ${
          disabledVariationButton
            ? 'opacity-50'
            : 'cursor-pointer hover:bg-gray-100'
        }`}
        onClick={() => setNewForm(true)}
        disabled={disabledVariationButton}
        title={
          disabledVariationButton
            ? 'Salve o produto antes de adicionar variações'
            : ''
        }
      >
        Adicionar nova variação
      </button>
      {newForm && (
        <ProductVariationForm
          suppliers={suppliers}
          newForm={newForm}
          removeNewForm={() => setNewForm(false)}
        />
      )}
      {product?.variations.map((variation) => (
        <ProductVariationForm
          suppliers={suppliers}
          variation={variation}
          key={variation.id}
        />
      ))}
    </div>
  );
}
