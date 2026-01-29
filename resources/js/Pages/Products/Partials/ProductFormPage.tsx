import BrandType from '@/Types/BrandType';
import ProductForm from './Forms/ProductForm';
import ProductVariationForm from './Forms/ProductVariationForm';
import CategoryType from '@/Types/CategoryType';
import ProductType from '@/Types/ProductType';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import ProductVariationType from '@/Types/ProductVariationType';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { GridContainer, GridItem } from '@/Components/Grid';
import ImagesFormModal from './Forms/ImagesFormModal';
import { FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

export default function ProductFormPage() {
  const product = usePage().props.product as ProductType | null;
  const brands = usePage().props.brands as BrandType[];
  const categories = usePage().props.categories as CategoryType[];
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [openVariationFormModal, setOpenVariationFormModal] = useState(false);
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariationType | null>(null);

  const disabledVariationButton = !product || selectedVariation !== null;

  // Atualizar a variação quando o produto for alterado (após editar as imagens não estava atualizando)
  useEffect(() => {
    if (selectedVariation) {
      const selectedVariationId = selectedVariation.id;
      const updatedVariation = product?.variations.find(
        (variation) => variation.id === selectedVariationId
      );
      setSelectedVariation(updatedVariation || null);
    }
  }, [product]);

  // ==================== Definir variação como padrão do produto no backend ====================
  const handleDefaultColor = (colorId: number) => {
    router.patch(route('products.updateDefaultColor', product?.id), {
      default_color_id: colorId,
    });
  };

  // ==================== Deletar variação do produto no backend ====================
  const handleDeleteColorVariation = () => {
    const variationIds = selectedVariation?.sizes.map((size) => size.id);
    router.post(
      route('productVariation.destroyColor'),
      { ids: variationIds },
      {
        preserveScroll: true,
      }
    );
  };

  return (
    <>
      <GridContainer gap={6} className="mb-6">
        <GridItem size={8} mdSize={12}>
          <ProductForm brands={brands} categories={categories} />
          {product && (
            <ProductVariationForm
              open={openVariationFormModal}
              onClose={() => {
                setOpenVariationFormModal(false);
                setSelectedVariation(null);
              }}
              variation={selectedVariation}
              handleCancelButton={() => setSelectedVariation(null)}
            />
          )}
        </GridItem>
        <GridItem size={4} mdSize={12}>
          {product && product.variations.length > 0 && (
            <Card className="w-full max-h-[880px] overflow-y-auto">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-primary-dark font-bold text-lg">
                  Variações do produto
                </h2>
                <span className="font-bold text-sm">
                  Total: {product.variations.length || 0}
                </span>
              </div>
              <GridContainer gap={3}>
                {product.variations.map((variation) => (
                  <GridItem key={variation.id} size={12} mdSize={6}>
                    <Card className="relative w-full mb-3" key={variation.id}>
                      {/* <div className="h-[220px]">
                        <Carousel images={variation.images} />
                      </div> */}
                      <GridContainer gap={2}>
                        <GridItem size={6}>
                          <p className="font-bold">Cor:</p>
                          <p>{variation.color.value}</p>
                        </GridItem>

                        <GridItem size={6}>
                          <p className="font-bold">Tamanhos:</p>
                          <p>
                            {variation.sizes
                              .map((item) => item.size)
                              .join(', ')}
                          </p>
                        </GridItem>
                      </GridContainer>
                      <div
                        className={` w-fit border border-primary p-1 text-[12px] rounded-full px-2 mt-2 text-primary-dark  ${
                          variation.color.id === product?.defaultColor?.id
                            ? 'bg-gray-200 font-bold'
                            : 'bg-gray-50 '
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleDefaultColor(variation.color.id)}
                        >
                          {variation.color.id === product?.defaultColor?.id
                            ? 'Cor principal'
                            : 'Definir cor principal'}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-4 justify-between">
                        <div className="flex gap-2">
                          <PrimaryButton
                            onClick={() => {
                              setOpenImagesModal(true);
                              setSelectedVariation(variation);
                            }}
                          >
                            Imagens
                          </PrimaryButton>
                          <PrimaryButton
                            outline
                            onClick={() => {
                              setOpenVariationFormModal(true);
                              setSelectedVariation(variation);
                            }}
                          >
                            Tamanhos
                          </PrimaryButton>
                        </div>
                        <div className="flex items-center">
                          <FaTrashAlt
                            data-tooltip-id={`delete-${variation.id}`}
                            className={`cursor-pointer text-gray-400 outline-none hover:text-red-600`}
                            onClick={() => {
                              setSelectedVariation(variation);
                              setOpenConfirmDialog(true);
                            }}
                          />
                          <Tooltip
                            id={`delete-${variation.id}`}
                            place="top"
                            content="Excluir"
                            className="!p-2 !text-[12px]"
                          />
                        </div>
                      </div>
                    </Card>
                  </GridItem>
                ))}
              </GridContainer>
            </Card>
          )}

          <button
            type="button"
            className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold ${
              disabledVariationButton
                ? 'opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }`}
            onClick={() => {
              setOpenVariationFormModal(true);
            }}
            disabled={disabledVariationButton}
            title={
              disabledVariationButton
                ? 'Salve o produto antes de adicionar uma nova variação'
                : ''
            }
          >
            Adicionar nova cor
          </button>
        </GridItem>
      </GridContainer>
      <ImagesFormModal
        open={openImagesModal}
        onClose={() => {
          setOpenImagesModal(false);
          setSelectedVariation(null);
        }}
        color={selectedVariation?.color}
        images={selectedVariation?.images || []}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        title="Tem certeza que deseja remover o produto com esta cor?"
        description="Todos os tamanhos e imagens associados a esta cor serão removidos. Esta ação não pode ser desfeita."
        onAccept={() => {
          handleDeleteColorVariation();
          setOpenConfirmDialog(false);
        }}
        onClose={() => {
          setOpenConfirmDialog(false);
          setSelectedVariation(null);
        }}
      />
    </>
  );
}
