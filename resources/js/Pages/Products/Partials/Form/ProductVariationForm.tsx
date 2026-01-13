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
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { IoIosAddCircle, IoMdInformationCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import SortableImages from './SortableImages';
import { parse } from 'path';
import { GridContainer, GridItem } from '@/Components/Grid';
import Modal from '@/Components/Modal';
import ColorForm from './ColorForm';

interface ProductVariationFormProps {
  suppliers: SupplierType[];
  variation: ProductVariationType | null;
  setNewForm?: (newForm: boolean) => void;
  handleCancelButton?: () => void;
  setOpenConfirmDialog?: (open: boolean) => void;
  setSelectedVariation?: (variation: ProductVariationType | null) => void;
  open: boolean;
  onClose: () => void;
}

export default function ProductVariationForm({
  suppliers,
  variation,
  setNewForm,
  handleCancelButton,
  setOpenConfirmDialog,
  setSelectedVariation,
  open,
  onClose,
}: ProductVariationFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [selectedSize, setSelectedSize] = useState(variation?.sizes[0] || null);
  const [openColorForm, setOpenColorForm] = useState(false);

  const product = usePage().props?.product as ProductType;
  const colors = usePage().props?.colors as any[];

  const colorOptions = colors?.map((color) => ({
    value: color.id,
    label: color.value,
  }));

  // ==================== Configuração do formulário ====================
  const { data, setData, reset, post, errors, patch, setError } = useForm({
    product_id: product.id || '',
    color: '',
    size: '',
    price: '',
    old_price: '',
    stock_quantity: '',
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

  // useEffect(() => {
  //   if (variation) {
  //     setData('color', variation.color);
  //     setData('size', variation.size);
  //     setData('price', parseFloat(variation.price.toString()).toFixed(2));
  //     setData(
  //       'old_price',
  //       variation.oldPrice
  //         ? parseFloat(variation.oldPrice.toString()).toFixed(2)
  //         : ''
  //     );
  //     setData('stock_quantity', variation.stockQuantity.toString());
  //     setData('sku', variation.sku);
  //     setData('supplier_id', (variation?.supplier?.id as any) || '');
  //     setData('pix_discount_type', variation.pixDiscountType || '');
  //     setData(
  //       'pix_discount_value',
  //       variation.pixDiscountType === 'fixed'
  //         ? parseFloat(variation?.pixDiscountValue?.toString() || '0').toFixed(
  //             2
  //           )
  //         : variation?.pixDiscountValue?.toString() || ''
  //     );
  //     setData(
  //       'images',
  //       (variation?.images.map((image) => ({
  //         id: image.id,
  //         preview: image.url,
  //         uid: crypto.randomUUID(),
  //       })) as {
  //         id?: number;
  //         file?: File;
  //         preview?: string;
  //         uid?: string;
  //       }[]) || []
  //     );
  //   }
  // }, [variation]);

  // ==================== Envio do formulário para o backend ====================
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

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
            if (!variation && handleCancelButton) {
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

  // ==================== Definir variação como padrão do produto no backend ====================
  const handleDefaultVariation = (variationId: number) => {
    router.patch(route('products.updateDefaultVariation', product.id), {
      default_variation_id: variationId,
    });
  };

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

  console.log(variation);
  console.log('data', data);
  console.log(errors);

  return (
    <>
      <Modal
        show={open}
        onClose={() => {
          onClose();
          setSelectedSize(null);
          reset();
        }}
        layer={0}
      >
        {variation && (
          <div className="mb-5">
            <h4 className="mb-1 font-medium">Qual tamanho quer editar?</h4>
            <div className="flex gap-4">
              {variation?.sizes.map((size) => (
                <div className="relative w-fit">
                  <span
                    className={`p-1.5 bg-gray-200 cursor-pointer font-medium rounded-sm ${
                      selectedSize === size ? 'border border-primary-dark' : ''
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.size}
                  </span>
                  <button
                    type="button"
                    className="absolute -right-2 -bottom-2 bg-red-900 rounded-full text-white text-[10px] p-0.5"
                    onClick={() => setSelectedSize(size)}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {((variation && selectedSize) || !variation) && (
          <Card className="w-full relative">
            <h3 className="font-bold text-lg text-primary-dark">
              Variação do Produto
            </h3>
            <form>
              {variation && (
                <div className="absolute top-4 right-4 flex items-center gap-3">
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
              {/* {newForm && (
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
            )} */}
              <GridContainer gap={3}>
                <GridItem size={6}>
                  <InputLabel htmlFor="color" value="Cor" className="mt-4" />
                  <SelectInput
                    options={colorOptions}
                    value={data.color}
                    onChange={(e) => setData('color', e)}
                    placeholder="Selecione uma cor"
                  />
                  <InputError className="mt-2" message={errors.color} />
                  <div className="flex gap-1 items-center mt-1">
                    <p className="text-sm text-gray-600">
                      Não encontrou a cor? Adicione uma nova{' '}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpenColorForm(true)}
                      className="text-primary cursor-pointer text-md"
                    >
                      <FaPlusCircle />
                    </button>
                  </div>
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
                  <InputError
                    className="mt-2"
                    message={errors.stock_quantity}
                  />
                </GridItem>
                <GridItem size={6}>
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

                <GridItem size={8}>
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
                          data.pix_discount_type === 'fixed'
                            ? 'decimal'
                            : 'integer'
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

              <div className="flex justify-end my-3 mt-6 gap-3">
                <PrimaryButton
                  outline
                  onClick={handleCancelButton}
                  type="button"
                >
                  Cancelar
                </PrimaryButton>

                <PrimaryButton type="button" onClick={submit}>
                  Salvar Variação
                </PrimaryButton>
              </div>
            </form>
          </Card>
        )}
        {/* ======================== IMAGENS ======================== */}
        <input
          type="file"
          multiple
          className="hidden"
          accept="image/*"
          ref={imageInputRef}
          onChange={(e) => handleAddImage(e)}
        />
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

        {/* {data.images && data.images.length > 0 && (
          <>
            <h4 className="text-primary font-bold mt-5 ">Imagens</h4>
            <SortableImages
              images={data.images}
              handleDelete={handleDeleteImage}
              setImages={setData}
            />
          </>
        )} */}
      </Modal>
      <ColorForm open={openColorForm} onClose={() => setOpenColorForm(false)} />
    </>
  );
}
