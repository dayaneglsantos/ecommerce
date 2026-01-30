import DateSelect from '@/Components/DateSelect';
import EmptyContent from '@/Components/EmptyContent';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductStockEntrieType from '@/Types/ProductStockEntrieType';
import { Head, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function ProductEntriesList() {
  const productStockEntries = usePage().props
    .productStockEntries as ProductStockEntrieType[];

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

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

  console.log(filters);

  return (
    <AuthenticatedLayout>
      <Head title="Entradas de Produtos" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <h3 className="font-bold text-lg text-primary-dark">
          Entradas de Produtos
        </h3>

        <div className="flex flex-col gap-1">
          <span className="font-bold text-gray-600">Período</span>
          <div className="flex gap-3">
            <DateSelect
              value={filters.startDate}
              onChange={(date) => setFilters({ ...filters, startDate: date })}
              placeholder="Data inicial"
            />
            <DateSelect
              value={filters.endDate}
              onChange={(date) => setFilters({ ...filters, endDate: date })}
              placeholder="Data final"
            />
          </div>
        </div>

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
