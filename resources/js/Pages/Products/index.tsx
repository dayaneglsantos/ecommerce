import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import ProductType from '@/Types/ProductType';
import { Head } from '@inertiajs/react';
import ProductForm from './Partials/ProductFormPage';
import ProductsList from './Partials/ProductsList';
import ProductVariationType from '@/Types/ProductVariationType';
import ProductFormPage from './Partials/ProductFormPage';
import SupplierType from '@/Types/SupplierType';

export default function ProductsPage() {
  const currentTab = route().current();

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
          {/* Listagem de produtos */}
          {currentTab === 'products.index' && <ProductsList />}
          {/* Criação e edição de produtos */}
          {(currentTab === 'products.create' ||
            currentTab === 'products.edit') && <ProductFormPage />}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
