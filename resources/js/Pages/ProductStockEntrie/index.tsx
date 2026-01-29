import EmptyContent from '@/Components/EmptyContent';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductStockEntrieType from '@/Types/ProductStockEntrieType';
import { Head, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function ProductEntriesList() {
  const productStockEntries = usePage().props
    .productStockEntries as ProductStockEntrieType[];

  const columns = [
    { label: 'Produto', id: 'product' },
    { label: 'Cor', id: 'color' },
    { label: 'Tamanho', id: 'size' },
    { label: 'Quantidade', id: 'quantity' },
    { label: 'Custo Unitário', id: 'unitCost' },
    { label: 'Data de Criação', id: 'createdAt' },
  ];

  const data = productStockEntries.map((entry: ProductStockEntrieType) => ({
    product: entry.productVariation.product.name,
    color: entry.productVariation.color,
    size: entry.productVariation.size,
    quantity: entry.quantity,
    unitCost: entry.unitCost,
    createdAt: (
      <span>
        {dayjs(entry.createdAt).format('DD/MM/YYYY')} às{' '}
        {dayjs(entry.createdAt).format('HH:mm')}
      </span>
    ),
  }));

  console.log(productStockEntries);

  return (
    <AuthenticatedLayout>
      <Head title="Entradas de Produtos" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        {productStockEntries.length === 0 ? (
          <EmptyContent
            title="Nenhuma entrada de produto encontrada"
            description="Tente realizar a busca novamente mais tarde."
          />
        ) : (
          <Table columns={columns} data={data} />
        )}
      </div>
    </AuthenticatedLayout>
  );
}
