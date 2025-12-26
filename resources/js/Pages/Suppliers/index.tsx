import Card from '@/Components/Card';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SupplierType from '@/Types/SupplierType';
import { Head, usePage } from '@inertiajs/react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import SupplierFormModal from './Partials/SupplierFormModal';
import { useState } from 'react';

export default function SuppliersPage() {
  const currentTab = route().current();
  const suppliers = usePage().props.suppliers as SupplierType[];
  const [openFormModal, setOpenFormModal] = useState(false);

  console.log(suppliers);

  return (
    <AuthenticatedLayout>
      <Head title="Criar produto" />

      <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-primary-dark font-bold text-lg">Fornecedores</h2>
          <span>Total: {suppliers.length}</span>
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton onClick={() => setOpenFormModal(true)}>
            Adicionar fornecedor
          </PrimaryButton>
        </div>
        {/* Listagem de fornecedores */}
        {currentTab === 'suppliers.index' && (
          <div className="grid grid-cols-4 gap-3">
            {suppliers.map((supplier: any) => (
              <Card key={supplier.id} className="col-span-2 w-full relative ">
                <h3 className="text-lg font-medium text-gray-900">
                  {supplier.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  CNPJ: {supplier.cnpj}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Email: {supplier.email}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Telefone: {supplier.phoneNumber}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Nome do contato na empresa: {supplier.contactName}
                </p>

                {/* ==== Edição e exclusão ====*/}
                <div className="flex items-center gap-2 absolute top-4 right-4 ">
                  <button type="button" onClick={() => {}}>
                    <FaPencilAlt
                      data-tooltip-id="edit"
                      className={`cursor-pointer ${
                        true ? 'text-gray-500' : 'text-gray-200'
                      } outline-none`}
                    />
                    <Tooltip
                      id="edit"
                      place="top"
                      content="Editar"
                      className="!p-2 !text-[12px]"
                    />
                  </button>
                  <button type="button" onClick={() => {}}>
                    <FaTrashAlt
                      data-tooltip-id="delete"
                      className={`cursor-pointer text-gray-500 outline-none hover:text-red-600`}
                    />
                    <Tooltip
                      id="delete"
                      place="top"
                      content="Excluir"
                      className="!p-2 !text-[12px]"
                    />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <SupplierFormModal
        open={openFormModal}
        onClose={() => setOpenFormModal(false)}
      />
    </AuthenticatedLayout>
  );
}
