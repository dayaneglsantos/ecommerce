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
import { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoIosAddCircle, IoMdInformationCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import SortableImages from './SortableImages';
import { parse } from 'path';
import { GridContainer, GridItem } from '@/Components/Grid';

interface ProductVariationFormProps {
  suppliers: SupplierType[];
  variation?: ProductVariationType;
  newForm?: boolean;
  setNewForm?: (newForm: boolean) => void;
  handleCancelButton?: () => void;
  setOpenConfirmDialog?: (open: boolean) => void;
  setSelectedVariation?: (variation: ProductVariationType | null) => void;
}

export default function ProductVariationForm({
  suppliers,
  variation,
  newForm,
  setNewForm,
  handleCancelButton,
  setOpenConfirmDialog,
  setSelectedVariation,
}: ProductVariationFormProps) {
  const [specificationName, setSpecificationName] = useState('');
  const [specificationDescription, setSpecificationDescription] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const product = usePage().props?.product as ProductType;

  // ==================== Configuração do formulário ====================
  const { data, setData, reset, post, errors, patch, setError } = useForm({
    product_id: product.id || '',
    color: '',
    color_code: '',
    size: '',
    price: '',
    old_price: '',
    stock_quantity: '',
    technical_specifications: {},
    sku: '',
    supplier_id: '',
    pix_discount_type: 'percentage',
    pix_discount_value: '',
    is_default: product.variations.length === 0 ? true : false,
    images: [] as {
      id?: number;
      file?: File;
      preview?: string;
      uid?: string;
    }[],
    images_to_delete: [] as number[],
  });

  useEffect(() => {
    if (variation) {
      setData('color', variation.color);
      setData('color_code', variation.colorCode);
      setData('size', variation.size);
      setData('price', parseFloat(variation.price.toString()).toFixed(2));
      setData(
        'old_price',
        variation.oldPrice
          ? parseFloat(variation.oldPrice.toString()).toFixed(2)
          : ''
      );
      setData('stock_quantity', variation.stockQuantity.toString());
      setData(
        'technical_specifications',
        variation.technicalSpecifications || {}
      );
      setData('sku', variation.sku);
      setData('supplier_id', (variation?.supplier?.id as any) || '');
      setData('pix_discount_type', variation.pixDiscountType || '');
      setData(
        'pix_discount_value',
        variation.pixDiscountType === 'fixed'
          ? parseFloat(variation?.pixDiscountValue?.toString() || '0').toFixed(
              2
            )
          : variation?.pixDiscountValue?.toString() || ''
      );
      setData(
        'images',
        (variation?.images.map((image) => ({
          id: image.id,
          preview: image.url,
          uid: crypto.randomUUID(),
        })) as {
          id?: number;
          file?: File;
          preview?: string;
          uid?: string;
        }[]) || []
      );
    }
  }, [variation]);

  // ==================== Envio do formulário para o backend ====================
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (specificationDescription && specificationName) {
      setError(
        'technical_specifications',
        'Você possui uma especificação não adicionada.'
      );
      return;
    }

    const imagesWithPosition = data.images.map((img, index) => ({
      ...img,
      position: index + 1,
    }));

    const payload = {
      ...data,
      images: imagesWithPosition,
    };

    if (variation) {
      router.post(
        route('productVariation.update', variation.id),
        {
          ...payload,
          _method: 'PATCH',
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            setSelectedVariation && setSelectedVariation(null);
          },
          onError: (errors) => {
            Object.keys(errors).forEach((key: any) => {
              setError(key, errors[key]);
            });
          },
        }
      );
    } else {
      router.post(
        route('productVariation.store'),
        { ...payload },
        {
          preserveScroll: true,
          onSuccess: () => {
            if (newForm && handleCancelButton) {
              handleCancelButton();
              setNewForm && setNewForm(false);
              reset();
            }
          },
          onError: (errors) => {
            Object.keys(errors).forEach((key: any) => {
              setError(key, errors[key]);
            });
          },
        }
      );
    }
  };

  // ==================== Opções de fornecedores para o select ====================
  const suppliersOptions = suppliers?.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  // ==================== Adicionar especificação técnica ao formulário ====================
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

  // ==================== Definir variação como padrão do produto no backend ====================
  const handleDefaultVariation = (variationId: number) => {
    router.patch(route('products.updateDefaultVariation', product.id), {
      default_variation_id: variationId,
    });
  };

  // Tamanho das especificações técnicas
  const specificationsSize = Object.entries(
    data.technical_specifications
  ).length;

  // ==================== Adicionar nova imagem ao formulário ====================
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const filesArray = Array.from(files);

    filesArray.forEach((file: File, index: number) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData('images', [
          ...data.images,
          { file, preview: reader.result as string, uid: crypto.randomUUID() },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // ==================== Deletar imagem do formulário ====================
  const handleDeleteImage = (image: any) => {
    // Adicionar ao formulário o id para deletar no backend
    if (image.id) {
      setData('images_to_delete', [...data.images_to_delete, image.id]);
      setData(
        'images',
        data.images.filter((img: any) => img.id !== image.id)
      );
    } else {
      // Remover do formulário de novas imagens
      setData(
        'images',
        data.images.filter((img: any) => image.file.name !== img.file.name)
      );
    }
  };

  console.log('data', data);
  console.log(errors);

  return (
    <Card className="w-full relative mt-6">
      <h3 className="font-bold text-lg text-primary-dark">
        Variação do Produto
      </h3>
      <form onSubmit={submit}>
        {!newForm && variation && (
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <div
              className={` border border-primary p-1 text-[12px] rounded-full px-2 text-primary-dark  ${
                product.defaultVariation?.id === variation?.id
                  ? 'bg-gray-200 font-bold'
                  : 'bg-gray-50 '
              }`}
            >
              <button
                type="button"
                onClick={() => handleDefaultVariation(variation.id)}
              >
                {product.defaultVariation?.id === variation.id
                  ? 'Produto Principal'
                  : 'Definir como principal'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedVariation && setSelectedVariation(variation);
                setOpenConfirmDialog && setOpenConfirmDialog(true);
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
              disabled={product.variations.length === 0}
              id="defaultCheckbox"
            />
            <InputLabel
              htmlFor="defaultCheckbox"
              value="Produto principal"
              className={`${
                product.variations.length === 0 ? '!text-gray-400' : ''
              }`}
            />
          </div>
        )}
        <GridContainer gap={3}>
          <GridItem size={6}>
            <InputLabel htmlFor="color" value="Cor" className="mt-4" />
            <TextInput
              id="color"
              type="text"
              value={data.color}
              className="mt-1 block w-full"
              onChange={(e) => setData('color', e.target.value)}
            />
            <InputError className="mt-2" message={errors.color} />
          </GridItem>
          <GridItem size={6}>
            <InputLabel
              htmlFor="color_code"
              value="Código da cor"
              className="mt-4"
              icon={<IoMdInformationCircle />}
              iconText="Código hexadecimal da cor. Ex: #FFFFFF"
            />
            <div className="flex items-center gap-2">
              <TextInput
                id="color_code"
                type="text"
                value={data.color_code}
                className="mt-1 block w-full"
                onChange={(e) => {
                  // Garantir que o valor comece com #
                  if (!e.target.value.startsWith('#')) {
                    e.target.value = `#${e.target.value}`;
                  }
                  // Limitar a 7 caracteres (# + 6 dígitos hexadecimais)
                  if (e.target.value.length > 7) {
                    e.target.value = e.target.value.slice(0, 7);
                  }
                  setData('color_code', e.target.value);
                }}
              />
              {data?.color_code && (
                <div
                  className={`h-8 w-8 rounded-lg border border-gray-300`}
                  style={{ backgroundColor: data.color_code }}
                />
              )}
            </div>
            <InputError className="mt-2" message={errors.color_code} />
          </GridItem>
          <GridItem size={6}>
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
          </GridItem>
          <GridItem size={6}>
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
          </GridItem>
          <GridItem size={6}>
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
          </GridItem>
          <GridItem size={6}>
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
          </GridItem>
          <GridItem size={5}>
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
          </GridItem>

          <GridItem size={7}>
            <InputLabel
              htmlFor="pix_discount_value"
              value="Desconto PIX"
              className="mt-4"
            />
            <div className="flex gap-3">
              <div className="grow">
                <TextInput
                  id="pix_discount_value"
                  type="number"
                  typeNumber={
                    data.pix_discount_type === 'fixed' ? 'decimal' : 'integer'
                  }
                  className="mt-1 block w-full"
                  value={data.pix_discount_value}
                  onChange={(e) => {
                    if (data.pix_discount_type === 'percentage') {
                      if (
                        Number(e.target.value) < 0 ||
                        Number(e.target.value) > 100 ||
                        isNaN(Number(e.target.value))
                      )
                        return;
                    }
                    setData('pix_discount_value', e.target.value);
                  }}
                />
                <InputError
                  className="mt-2"
                  message={errors.pix_discount_value}
                />
              </div>
              <div className="self-end mb-2 ml-3">
                <div className="flex items-center gap-1">
                  <Checkbox
                    onChange={(e) => {
                      setData('pix_discount_type', 'percentage');
                      setData('pix_discount_value', '');
                    }}
                    checked={data.pix_discount_type === 'percentage'}
                  />
                  <InputLabel htmlFor="color" value="Porcentagem (%)" />
                </div>
                <div className="flex items-center gap-1">
                  <Checkbox
                    onChange={(e) => {
                      setData('pix_discount_type', 'fixed');
                      setData('pix_discount_value', '');
                    }}
                    checked={data.pix_discount_type === 'fixed'}
                  />
                  <InputLabel htmlFor="color" value="Valor fixo" />
                </div>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        <h4 className="font-bold mt-5  text-primary">
          Espeficicações técnicas
        </h4>

        <div className="flex items-center mb-1">
          <GridContainer gap={3} className="mt-3 grow">
            <GridItem size={6}>
              <InputLabel htmlFor="specificationName" value="Tipo" />
              <TextInput
                id="specificationName"
                type="text"
                value={specificationName}
                className="mt-1 block w-full"
                onChange={(e) => setSpecificationName(e.target.value)}
              />
            </GridItem>
            <GridItem size={6}>
              <InputLabel
                htmlFor="specificationDescription"
                value="Descrição"
              />
              <TextInput
                id="specificationDescription"
                value={specificationDescription}
                type="text"
                className="mt-1 block w-full"
                onChange={(e) => setSpecificationDescription(e.target.value)}
              />
            </GridItem>
          </GridContainer>
          <IoIosAddCircle
            className="text-2xl mt-8 ml-3 cursor-pointer text-primary-dark"
            onClick={handleAddSpecification}
          />
        </div>
        <InputError message={errors.technical_specifications} />

        {specificationsSize > 0 &&
          Object.entries(data.technical_specifications).map(([key, value]) => (
            <div className="w-full shadow-full p-3 rounded-2xl my-5">
              <div
                key={key}
                className="flex items-center justify-between gap-3 "
              >
                <p>
                  <b>{key}: </b>
                  {value as React.ReactNode}
                </p>
                <FaTrashAlt
                  onClick={() => {
                    const updatedSpecifications = Object.fromEntries(
                      Object.entries(data.technical_specifications).filter(
                        ([k]) => k !== key
                      )
                    );
                    setData('technical_specifications', updatedSpecifications);
                  }}
                  className={`cursor-pointer text-gray-500 outline-none hover:text-red-600`}
                />
              </div>
            </div>
          ))}

        {data.images && data.images.length > 0 && (
          <>
            <h4 className="text-primary font-bold mt-5 ">Imagens</h4>
            <SortableImages
              images={data.images}
              handleDelete={handleDeleteImage}
              setImages={setData}
            />
          </>
        )}
        <button
          type="button"
          className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold`}
          onClick={() => imageInputRef.current?.click()}
        >
          Adicionar imagem
        </button>
        {errors.images && (
          <InputError
            className="mt-2"
            message="Você deve adicionar pelo menos uma imagem."
          />
        )}
        <input
          type="file"
          multiple
          className="hidden"
          accept="image/*"
          ref={imageInputRef}
          onChange={(e) => handleAddImage(e)}
        />
        <div className="flex justify-end my-3 mt-6 gap-3">
          <PrimaryButton outline onClick={handleCancelButton} type="button">
            Cancelar
          </PrimaryButton>

          <PrimaryButton type="submit">Salvar Variação</PrimaryButton>
        </div>
      </form>
    </Card>
  );
}
