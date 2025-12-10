import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import ProductType from '@/Types/ProductType';
import { Head } from '@inertiajs/react';
import ProductForm from './Partials/ProductForm';
import ProductsList from './Partials/ProductsList';
import ProductVariationType from '@/Types/ProductVariationType';

interface ProductsPageProps {
  products: ProductType[];
  brands: BrandType[];
  categories: CategoryType[];
  productVariations: ProductVariationType[];
}

export default function ProductsPage({
  products,
  brands,
  categories,
  productVariations,
}: ProductsPageProps) {
  const currentTab = route().current();
  console.log(currentTab);

  return (
    <AuthenticatedLayout>
      <Head title="Criar produto" />
      <div className="flex gap-2 px-3 py-2 bg-primaryLight/20">
        <NavLink
          href={route('products.index')}
          active={route().current('products.index')}
        >
          Produtos cadastrados
        </NavLink>
        <NavLink
          href={route('products.create')}
          active={route().current('products.create')}
        >
          Novo produto
        </NavLink>
        <NavLink>Nova variação de produto</NavLink>
      </div>
      <div className="py-8">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          {currentTab === 'products.index' && (
            <ProductsList
              productVariations={productVariations}
              brands={brands}
              categories={categories}
            />
          )}
          {currentTab === 'products.create' && (
            <ProductForm brands={brands} categories={categories} />
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
