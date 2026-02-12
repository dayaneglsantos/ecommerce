import CalendarInput from '@/Components/CalendarInput';
import EmptyContent from '@/Components/EmptyContent';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MetaType } from '@/Types/MetaType';
import ProductStockEntrieType from '@/Types/ProductStockEntrieType';
import { Head, Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFileExcel } from 'react-icons/fa6';

interface ProductStockEntries {
  data: ProductStockEntrieType[];
  meta: MetaType;
}

export default function ProductEntriesList() {
  const { data, meta } = usePage().props
    .productStockEntries as ProductStockEntries;

  const { filters: serverFilters } = usePage().props as any;

  const [filters, setFilters] = useState({
    startDate: serverFilters?.startDate || '',
    endDate: serverFilters?.endDate || '',
    search: serverFilters?.search || '',
  });
  const [debbouncedSearch, setDebouncedSearch] = useState(filters.search);

  const isFirstRender = useRef(true);

  const columns = [
    { label: 'Produto', id: 'product' },
    { label: 'Cor', id: 'color' },
    { label: 'Tamanho', id: 'size' },
    { label: 'Quantidade', id: 'quantity' },
    { label: 'Custo Unitário', id: 'unitCost' },
    { label: 'Data de Criação', id: 'createdAt' },
  ];

  const tableData = data?.map((entry: ProductStockEntrieType) => ({
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

  useEffect(() => {
    // Evita a chamada na primeira renderização
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    router.get(route('productStockEntries.index'), filters, {
      preserveState: true, // Mantém o que o usuário digitou
      replace: true, // Não cria um novo histórico no navegador a cada filtro
      only: ['productStockEntries'], // Performance: pede apenas os dados da tabela
    });
  }, [filters]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: debbouncedSearch,
      }));
    }, 500); // Ajuste o tempo de debounce conforme necessário

    return () => clearTimeout(delayDebounceFn);
  }, [debbouncedSearch]);

  const handleExport = () => {
    if (!filters.startDate || !filters.endDate) {
      toast.error('Selecione o período para exportar os dados.');
      return;
    }

    const query = new URLSearchParams({
      startDate: filters.startDate,
      endDate: filters.endDate,
      search: filters.search,
    }).toString();

    window.location.href = `${route('productStockEntries.export')}?${query}`;

    toast.success('Exportação iniciada. Verifique seus downloads.');
  };

  return (
    <AuthenticatedLayout>
      <Head title="Entradas de Produtos" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <h3 className="font-bold text-lg text-primary-dark">
          Entradas de Produtos
        </h3>

        {/* ============= Filtros ============= */}
        <GridContainer
          gap={3}
          className="p-3 py-5 rounded-md shadow-xl border border-gray-200"
        >
          <GridItem size={4}>
            <InputLabel
              htmlFor="search"
              value="Buscar por produto"
              className="mb-1 font-medium text-lg"
            />
            <TextInput
              id="search"
              value={debbouncedSearch}
              onChange={(e) => setDebouncedSearch(e.target.value)}
              placeholder="Buscar por produto"
            />
          </GridItem>
          <GridItem size={8}>
            <InputLabel value="Período" className="mb-1 font-medium text-lg" />
            <div className="flex gap-3 items-center">
              <CalendarInput
                value={filters.startDate}
                onChange={(date) => setFilters({ ...filters, startDate: date })}
                placeholder="Data inicial"
              />
              <CalendarInput
                value={filters.endDate}
                onChange={(date) => setFilters({ ...filters, endDate: date })}
                placeholder="Data final"
              />
              <PrimaryButton
                outline
                onClick={() =>
                  setFilters({ startDate: '', endDate: '', search: '' })
                }
              >
                Limpar filtros
              </PrimaryButton>
            </div>
          </GridItem>
        </GridContainer>
        {/* ========================== */}

        <div className="flex justify-end">
          <PrimaryButton className="flex items-center" onClick={handleExport}>
            <span>Exportar</span> <FaFileExcel className="text-lg ml-2" />
          </PrimaryButton>
        </div>

        {data.length === 0 ? (
          <EmptyContent
            title="Nenhuma entrada de produto encontrada"
            description={
              (filters.search || filters.startDate || filters.endDate) &&
              'Filtros aplicados não retornaram resultados.'
            }
          />
        ) : (
          <div>
            <Table columns={columns} data={tableData} />
          </div>
        )}

        <Pagination links={meta.links} />
      </div>
    </AuthenticatedLayout>
  );
}
