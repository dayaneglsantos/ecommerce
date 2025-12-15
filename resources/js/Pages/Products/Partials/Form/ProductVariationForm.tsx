import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import ProductType from '@/Types/ProductType';
import ProductVariationType from '@/Types/ProductVariationType';
import SupplierType from '@/Types/SupplierType';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoIosAddCircle, IoMdInformationCircle } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { transform } from 'typescript';

interface ProductVariationFormProps {
  suppliers: SupplierType[];
  variation?: ProductVariationType;
  newForm?: boolean;
  removeNewForm?: () => void;
}

export default function ProductVariationForm({
  suppliers,
  variation,
  newForm,
  removeNewForm,
}: ProductVariationFormProps) {
  const [specificationName, setSpecificationName] = useState('');
  const [specificationDescription, setSpecificationDescription] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(
    null
  );

  const { id: productId, defaultVariation } = usePage().props
    ?.product as ProductType;

  const { data, setData, reset, post, errors, patch } = useForm({
    product_id: productId,
    color: variation?.color || '',
    color_code: variation?.colorCode || '',
    size: variation?.size || '',
    price: variation?.price.toString() || '',
    old_price: variation?.oldPrice || '',
    stock_quantity: variation?.stockQuantity.toString() || '',
    technical_specifications: variation?.technicalSpecifications || {},
    sku: variation?.sku || '',
    supplier_id: variation?.supplier?.id || '',
    pix_discount_percent: variation?.pixDiscountPercent?.toString() || '',
    is_default: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (variation) {
      patch(route('productVariation.update', variation.id), {
        preserveScroll: true,
        onSuccess: () => reset(),
      });
    } else {
      post(route('productVariation.store'), {
        preserveScroll: true,
        onSuccess: () => {
          if (newForm && removeNewForm) {
            removeNewForm();
            reset();
          }
        },
      });
    }
  };

  const suppliersOptions = suppliers?.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  const handleAddSpecification = () => {
    if (specificationName && specificationDescription) {
      setData('technical_specifications', {
        ...data.technical_specifications,
        [specificationName]: specificationDescription,
      });
      setSpecificationName('');
      setSpecificationDescription('');
    }
  };

  const handleDeleteVariation = (variationId: number) => {
    router.delete(route('productVariation.destroy', variationId), {
      preserveScroll: true,
    });
  };

  const handleDefaultVariation = (variationId: number) => {
    router.patch(route('products.updateDefaultVariation', productId), {
      default_variation_id: variationId,
    });
  };

  const specificationsSize = Object.entries(
    data.technical_specifications
  ).length;

  return (
    <Card className="w-full relative">
      <h3 className="font-bold text-lg text-primaryDark">
        Variação do Produto
      </h3>
      <form onSubmit={submit}>
        {!newForm && variation && (
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <div
              className={` border border-primary p-1 text-[12px] rounded-full px-2 text-primaryDark  ${
                defaultVariation?.id === variation.id
                  ? 'bg-gray-200 font-bold'
                  : 'bg-gray-50 '
              }`}
            >
              <button
                type="button"
                onClick={() => handleDefaultVariation(variation.id)}
              >
                {defaultVariation?.id === variation.id
                  ? 'Produto Principal'
                  : 'Definir como principal'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedVariationId(variation.id);
                setOpenConfirmDialog(true);
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
        )}
        {newForm && (
          <div className="flex items-center gap-3 absolute top-4 right-4">
            <Checkbox
              onChange={(e) => setData('is_default', e.target.checked)}
              checked={data.is_default}
            />
            <InputLabel htmlFor="color" value="Produto principal" />
          </div>
        )}
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3">
            <InputLabel htmlFor="color" value="Cor" className="mt-4" />
            <TextInput
              id="color"
              type="text"
              value={data.color}
              className="mt-1 block w-full"
              onChange={(e) => setData('color', e.target.value)}
            />
            <InputError className="mt-2" message={errors.color} />
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="color_code"
              value="Código da cor"
              className="mt-4"
              icon={<IoMdInformationCircle />}
              iconText="Código hexadecimal da cor. Ex: #FFFFFF"
            />
            <TextInput
              id="color_code"
              type="text"
              value={data.color_code}
              className="mt-1 block w-full"
              onChange={(e) => setData('color_code', e.target.value)}
            />
            <InputError className="mt-2" message={errors.color_code} />
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="size"
              value="Tamanho"
              className="mt-4"
              icon={<IoMdInformationCircle />}
              iconText="De acordo com o tipo do produto. Ex: P, M, G... ou 35, 36 ,37..."
            />
            <TextInput
              id="size"
              type="text"
              className="mt-1 block w-full"
              value={data.size}
              onChange={(e) => setData('size', e.target.value)}
            />
            <InputError className="mt-2" message={errors.size} />
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="sku"
              value="Código de identificação do produto"
              className="mt-4"
              icon={<IoMdInformationCircle />}
              iconText="Ex: SKU12345"
            />
            <TextInput
              id="sku"
              type="text"
              value={data.sku}
              className="mt-1 block w-full"
              onChange={(e) => setData('sku', e.target.value)}
            />
            <InputError className="mt-2" message={errors.sku} />
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="supplier_id"
              value="Fornecedor"
              className="mt-4"
            />
            <SelectInput
              options={suppliersOptions}
              value={data.supplier_id}
              onChange={(e) => setData('supplier_id', e)}
              placeholder="Selecione um fornecedor"
            />
            <InputError className="mt-2" message={errors.supplier_id} />
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="stock_quantity"
              value="Quantidade em estoque"
              className="mt-4"
            />
            <TextInput
              id="stock_quantity"
              type="text"
              value={data.stock_quantity}
              className="mt-1 block w-full"
              onChange={(e) => setData('stock_quantity', e.target.value)}
            />
            <InputError className="mt-2" message={errors.stock_quantity} />
          </div>
          <div className="col-span-3">
            <InputLabel htmlFor="price" value="Preço" className="mt-4" />
            <TextInput
              id="price"
              type="number"
              typeNumber="decimal"
              value={data.price}
              className="mt-1 block w-full"
              onChange={(e) => setData('price', e.target.value)}
            />
            <InputError className="mt-2" message={errors.price} />
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="pix_discount_percent"
              value="Desconto PIX (%)"
              className="mt-4"
            />
            <TextInput
              id="pix_discount_percent"
              type="text"
              className="mt-1 block w-full"
              value={data.pix_discount_percent}
              onChange={(e) => {
                if (
                  Number(e.target.value) < 0 ||
                  Number(e.target.value) > 100 ||
                  isNaN(Number(e.target.value))
                )
                  return;
                setData('pix_discount_percent', e.target.value);
              }}
            />
            <InputError
              className="mt-2"
              message={errors.pix_discount_percent}
            />
          </div>
        </div>
        <h4 className="font-bold mt-5">Espeficicações técnicas</h4>

        <div className="flex items-center mb-5">
          <div className="grid grid-cols-6 gap-3 grow mt-3">
            <div className="col-span-6 md:col-span-3">
              <InputLabel htmlFor="price" value="Tipo" />
              <TextInput
                id="price"
                type="text"
                value={specificationName}
                className="mt-1 block w-full"
                onChange={(e) => setSpecificationName(e.target.value)}
              />
              {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
            </div>
            <div className="col-span-6 md:col-span-3">
              <InputLabel htmlFor="price" value="Descrição" />
              <TextInput
                id="price"
                value={specificationDescription}
                type="text"
                className="mt-1 block w-full"
                onChange={(e) => setSpecificationDescription(e.target.value)}
              />
              {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
            </div>
          </div>
          <IoIosAddCircle
            className="text-2xl mt-8 ml-3 cursor-pointer text-primaryDark"
            onClick={handleAddSpecification}
          />
        </div>
        {specificationsSize > 0 && (
          <div className="w-full shadow-full p-3 rounded-2xl my-5">
            {Object.entries(data.technical_specifications).map(
              ([key, value]) => (
                <div key={key} className="flex items-center mt-2 gap-3 ">
                  <p>
                    <b>{key}: </b>
                    {value as React.ReactNode}
                  </p>
                </div>
              )
            )}
          </div>
        )}
        <div className="flex justify-end my-3 mt-6 gap-3">
          {newForm && (
            <PrimaryButton outline onClick={removeNewForm} type="button">
              Cancelar
            </PrimaryButton>
          )}
          <PrimaryButton type="submit">Salvar Variação</PrimaryButton>
        </div>
      </form>
      <ConfirmDialog
        open={openConfirmDialog}
        title="Tem certeza que deseja remover esta variação?"
        onAccept={() => {
          selectedVariationId && handleDeleteVariation(selectedVariationId);
          setOpenConfirmDialog(false);
        }}
        onClose={() => {
          setOpenConfirmDialog(false);
          setSelectedVariationId(null);
        }}
      />
    </Card>
  );
}
