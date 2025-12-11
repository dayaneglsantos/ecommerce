import ProductForm from './Form/ProductForm';
import ProductVariationForm from './Form/ProductForm';

export default function ProductFormPage({ brands, categories }: any) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
      <ProductForm />
      <ProductVariationForm />
    </div>
  );
}
