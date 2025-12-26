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

export default function ProductFormPage() {
  const product = usePage().props.product as ProductType | null;
  const brands = usePage().props.brands as BrandType[];
  const categories = usePage().props.categories as CategoryType[];
  const suppliers = usePage().props.suppliers as SupplierType[];

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariationType | null>(null);

  const disabledVariationButton =
    product === undefined || newForm || selectedVariation !== null;

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

  return (
    <>
      <div className="grid grid-cols-6 gap-6 pb-6">
        <div className="col-span-6 lg:col-span-4">
          <ProductForm brands={brands} categories={categories} />
          <button
            type="button"
            className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold ${
              disabledVariationButton
                ? 'opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }`}
            onClick={() => setNewForm(true)}
            disabled={disabledVariationButton}
            title={
              disabledVariationButton
                ? 'Salve o produto antes de adicionar variações'
                : ''
            }
          >
            Adicionar nova variação
          </button>
          {newForm && (
            <ProductVariationForm
              suppliers={suppliers}
              setNewForm={setNewForm}
              newForm={newForm}
              handleCancelButton={() => setNewForm(false)}
            />
          )}
          {selectedVariation && (
            <ProductVariationForm
              suppliers={suppliers}
              variation={selectedVariation}
              handleCancelButton={() => setSelectedVariation(null)}
              setOpenConfirmDialog={setOpenConfirmDialog}
              setSelectedVariation={setSelectedVariation}
            />
          )}
        </div>
        <Card className="col-span-6 lg:col-span-2 w-full max-h-[880px] overflow-y-auto">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-primary-dark font-bold text-lg">
              Variações do produto
            </h2>
            <span className="font-bold text-sm">
              Total: {product?.variations.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product?.variations.map((variation) => (
              <Card
                className="w-full mb-3 col-span-4 md:col-span-2 lg:col-span-4"
                key={variation.id}
              >
                <Carousel images={variation.images} />
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <p className="font-bold">Cor:</p>
                    <p>{variation.color}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-bold">Cod. da Cor:</p>
                    <p>{variation.colorCode}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-bold">Tamanho:</p>
                    <p>{variation.size}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-bold">Cod. Identificação:</p>
                    <p>{variation.sku}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-bold">Estoque</p>
                    <p>{variation.stockQuantity}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-bold">Preço</p>
                    <p>{variation.price}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-bold">Desconto PIX</p>
                    <p>{variation.pixDiscountValue}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-bold mt-2">Especificações:</p>
                    {Object.entries(
                      variation?.technicalSpecifications || {}
                    ).map(([key, value]) => (
                      <p key={key}>
                        {key}: <span className="italic">{value}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 justify-between">
                  <div
                    className={` border border-primary p-1 text-[12px] rounded-full px-2 text-primary-dark  ${
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
                        ? 'Produto Principal'
                        : 'Definir principal'}
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <PrimaryButton
                      outline
                      onClick={() => {
                        setSelectedVariation(variation);
                        setNewForm(false);
                      }}
                    >
                      Editar
                    </PrimaryButton>
                    <PrimaryButton
                      onClick={() => {
                        setSelectedVariation(variation);
                        setOpenConfirmDialog(true);
                      }}
                    >
                      Excluir
                    </PrimaryButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
      {selectedVariation && (
        <ConfirmDialog
          open={openConfirmDialog}
          title="Tem certeza que deseja remover esta variação?"
          onAccept={() => {
            selectedVariation.id &&
              handleDeleteVariation(selectedVariation?.id);
            setOpenConfirmDialog(false);
          }}
          onClose={() => {
            setOpenConfirmDialog(false);
            setSelectedVariation(null);
          }}
        />
      )}
    </>
  );
}
