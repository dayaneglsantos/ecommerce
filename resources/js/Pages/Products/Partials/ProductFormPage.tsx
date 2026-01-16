import BrandType from '@/Types/BrandType';
import ProductForm from './Form/ProductForm';
import ProductVariationForm from './Form/ProductVariationForm';
import CategoryType from '@/Types/CategoryType';
import SupplierType from '@/Types/SupplierType';
import ProductType from '@/Types/ProductType';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from '@/Components/Aside';
import Card from '@/Components/Card';
import Carousel from '@/Components/Carousel';
import PrimaryButton from '@/Components/PrimaryButton';
import ProductVariationType from '@/Types/ProductVariationType';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { GridContainer, GridItem } from '@/Components/Grid';
import { Grid } from 'swiper/modules';

export default function ProductFormPage() {
  const product = usePage().props.product as ProductType | null;
  const brands = usePage().props.brands as BrandType[];
  const categories = usePage().props.categories as CategoryType[];
  const suppliers = usePage().props.suppliers as SupplierType[];

  const [openVariationFormModal, setOpenVariationFormModal] = useState(false);
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariationType | null>(null);

  const disabledVariationButton = !product || selectedVariation !== null;

  // ==================== Definir variação como padrão do produto no backend ====================
  const handleDefaultVariation = (variationId: number) => {
    router.patch(route('products.updateDefaultVariation', product?.id), {
      default_variation_id: variationId,
    });
  };

  // ==================== Deletar variação do produto no backend ====================
  const handleDeleteVariation = (variationId: number) => {
    router.delete(route('productVariation.destroy', variationId), {
      preserveScroll: true,
    });
  };

  console.log(product);

  return (
    <>
      <GridContainer gap={6} className="mb-6">
        <GridItem size={8} mdSize={12}>
          <ProductForm brands={brands} categories={categories} />
          <ProductVariationForm
            open={openVariationFormModal}
            onClose={() => {
              setOpenVariationFormModal(false);
              setSelectedVariation(null);
            }}
            variation={selectedVariation}
            handleCancelButton={() => setSelectedVariation(null)}
            setSelectedVariation={setSelectedVariation}
          />
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
                  <GridItem key={variation.id} size={12}>
                    <Card className="w-full mb-3" key={variation.id}>
                      <Carousel images={variation.images} />
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
                        className={`w-24 border border-primary p-1 text-[12px] rounded-full px-2 mt-2 text-primary-dark  ${
                          variation.id === product?.defaultVariation?.id
                            ? 'bg-gray-200 font-bold'
                            : 'bg-gray-50 '
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleDefaultVariation(variation.id)}
                        >
                          {variation.id === product?.defaultVariation?.id
                            ? 'Cor principal'
                            : 'Definir cor principal'}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-4 justify-between">
                        <div className="flex gap-3">
                          <PrimaryButton onClick={() => {}}>
                            Imagens
                          </PrimaryButton>
                          <PrimaryButton
                            outline
                            onClick={() => {
                              setOpenVariationFormModal(true);
                              setSelectedVariation(variation);
                            }}
                          >
                            Editar tamanhos
                          </PrimaryButton>
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
    </>
  );
}
