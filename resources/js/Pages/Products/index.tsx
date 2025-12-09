import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-lg font-semibold leading-tight text-gray-800">
          Produtos Cadastrados
        </h2>
      }
    >
      <Head title="Criar produto" />
      <div className="flex gap-2 px-3 py-2">
        <NavLink>Cadastrar novo produto</NavLink>
        <NavLink>Cadastar variação de produto</NavLink>
        <NavLink>teste1</NavLink>
      </div>
      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          listagem
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
