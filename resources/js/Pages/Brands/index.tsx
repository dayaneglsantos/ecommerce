import Card from '@/Components/Card';
import { GridContainer, GridItem } from '@/Components/Grid';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BrandType from '@/Types/BrandType';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import BrandFormModal from './Partials/BrandFormModal';
import ConfirmDialog from '@/Components/ConfirmDialog';
import Badge from '@/Components/Badge';

export default function BrandsPage() {
  const brands = usePage().props.brands as BrandType[];

  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteBrand = (brandId: number) => {
    router.delete(route('brands.destroy', brandId), {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        setSelectedBrand(null);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Criar produto" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-primary-dark font-bold text-lg">Fornecedores</h2>
          <span>Total: {brands.length}</span>
        </div>
        <div className="w-full flex justify-end">
          <PrimaryButton onClick={() => setOpenFormModal(true)}>
            Adicionar Marca
          </PrimaryButton>
        </div>
        <GridContainer gap={3}>
          {brands.map((brand: BrandType) => (
            <GridItem key={brand.id} size={4} smSize={12} mdSize={6}>
              <Card key={brand.id} className="w-full relative">
                <h3 className="text-lg font-medium text-gray-900">
                  {brand.name}
                </h3>
                <Badge type={brand.status === 'active' ? 'success' : 'error'}>
                  {brand.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>

                {/* ==== Edição e exclusão ====*/}
                <div className="flex items-center gap-2 absolute top-4 right-4 ">
                  <button type="button" onClick={() => {}}>
                    <FaPencilAlt
                      data-tooltip-id="edit"
                      className={`cursor-pointer text-gray-500 outline-none`}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setOpenFormModal(true);
                      }}
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
                      onClick={() => {
                        setSelectedBrand(brand);
                        setOpenDeleteDialog(true);
                      }}
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
            </GridItem>
          ))}
        </GridContainer>
      </div>
      <BrandFormModal
        open={openFormModal}
        onClose={() => {
          setOpenFormModal(false);
          setSelectedBrand(null);
        }}
        brand={selectedBrand}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        title="Tem certeza que deseja excluir esta marca?"
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedBrand(null);
        }}
        onAccept={() => handleDeleteBrand(selectedBrand!.id)}
      />
    </AuthenticatedLayout>
  );
}
