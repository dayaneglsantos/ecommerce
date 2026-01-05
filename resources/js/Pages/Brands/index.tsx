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
import Avatar from '@/Components/Avatar';

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
      <Head title="Marcas" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-primary-dark font-bold text-lg">Marcas</h2>
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
                <div className="flex justify-between items-center gap-3 mb-3">
                  <div className="flex items-center gap-3 w-[70%]">
                    <Avatar
                      src={brand.logo}
                      alt={brand.name}
                      size="md"
                      className=""
                    />
                    <p
                      className="text-lg font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={brand.name}
                    >
                      {brand.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 absolute top-4 right-4 ">
                    <Badge
                      type={brand.status === 'active' ? 'success' : 'error'}
                      size="sm"
                    >
                      {brand.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand(brand);
                        setOpenFormModal(true);
                      }}
                    >
                      <FaPencilAlt
                        data-tooltip-id="edit"
                        className={`cursor-pointer text-gray-500 outline-none`}
                      />
                      <Tooltip
                        id="edit"
                        place="top"
                        content="Editar"
                        className="!p-2 !text-[12px]"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand(brand);
                        setOpenDeleteDialog(true);
                      }}
                    >
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
                </div>
                <a
                  href={brand.website}
                  target="_blank"
                  className="italic text-gray-600"
                >
                  Acessar site da marca
                </a>
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
