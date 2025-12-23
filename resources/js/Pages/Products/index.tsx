import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductsList from './Partials/ProductsList';
import ProductFormPage from './Partials/ProductFormPage';
import ProductDetails from './Partials/ProductDetails';

export default function ProductsPage() {
  const currentTab = route().current();

  return (
    <AuthenticatedLayout>
      <Head title="Criar produto" />

      <div>
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          {/* Listagem de produtos */}
          {currentTab === 'products.index' && <ProductsList />}

          {/* Detalhes do produto */}
          {currentTab === 'products.show' && <ProductDetails />}

          {/* Criação e edição de produtos */}
          {(currentTab === 'products.create' ||
            currentTab === 'products.edit') && <ProductFormPage />}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
