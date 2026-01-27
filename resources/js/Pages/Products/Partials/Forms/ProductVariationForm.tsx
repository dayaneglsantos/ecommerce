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
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { GridContainer, GridItem } from '@/Components/Grid';
import Modal from '@/Components/Modal';
import ColorForm from './ColorForm';
import { FaCircleInfo } from 'react-icons/fa6';
import ImagesFormModal from './ImagesFormModal';

interface ProductVariationFormProps {
  variation: ProductVariationType | null;
  setNewForm?: (newForm: boolean) => void;
  handleCancelButton?: () => void;
  open: boolean;
  onClose: () => void;
}

export default function ProductVariationForm({
  variation,
  handleCancelButton,
  open,
  onClose,
}: ProductVariationFormProps) {
  const [selectedSize, setSelectedSize] = useState(variation?.sizes[0] || null);
  const [openColorForm, setOpenColorForm] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const [newSize, setNewSize] = useState(false);

  const product = usePage().props?.product as ProductType;
  const colors = usePage().props?.colors as any[];
  const sizes = usePage().props?.sizes as any[];

  const productColorIds = product?.variations.map(
    (variation) => variation.color.id
  );

  // Opção de cores excluindo as cores já adicionadas ao produto
  const colorOptions = colors
    .filter((color) => {
      return !productColorIds.includes(color.id);
    })
    .map((color) => ({
      value: color.id,
      label: color.value,
    }));

  const sizeOptions = sizes?.map((size) => ({
    value: size.id,
    label: size.value,
  }));

  // ==================== Configuração do formulário ====================
  const { data, setData, reset, post, errors, patch, setError } = useForm({
    product_id: product.id,
    color: 0,
    size: '',
    price: '',
    old_price: '',
    sku: '',
    pix_discount_type: 'percentage',
    pix_discount_value: '',
    is_default: product?.variations?.length === 0 ? true : false,
  });

  useEffect(() => {
    if (selectedSize && variation) {
      setData('color', variation.color.id);
      setData('size', selectedSize.size);
      setData('price', parseFloat(selectedSize.price.toString()).toFixed(2));
      setData(
        'old_price',
        selectedSize.oldPrice
          ? parseFloat(selectedSize.oldPrice.toString()).toFixed(2)
          : ''
      );
      setData('sku', selectedSize.sku);
      setData('pix_discount_type', selectedSize.pixDiscount.type || '');
      setData(
        'pix_discount_value',
        selectedSize.pixDiscount.type === 'fixed'
          ? parseFloat(
              selectedSize?.pixDiscount.value?.toString() || '0'
            ).toFixed(2)
          : selectedSize?.pixDiscount.value?.toString() || ''
      );
    }
  }, [selectedSize]);

  useEffect(() => {
    if (newSize && variation) {
      setData('color', variation.color.id);
    }
  }, [newSize]);

  // ==================== Envio do formulário para o backend ====================
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSize) {
      router.post(
        route('productVariation.update', selectedSize.id),
        {
          ...data,
          _method: 'PATCH',
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            onClose();
            reset();
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
        { ...data },
        {
          preserveScroll: true,
          onSuccess: () => {
            reset();
            setNewSize(false);
            setSelectedSize(null);
            if (!variation && handleCancelButton) {
              handleCancelButton();
              onClose();
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

  // ==================== Deletar tamanho  ====================
  const handleDeleteSize = () => {
    if (selectedSize) {
      router.delete(route('productVariation.destroy', selectedSize.id), {
        onSuccess: () => {
          setSelectedSize(null);
          setOpenConfirmDialog && setOpenConfirmDialog(false);
        },
      });
    }
  };

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
        <div className="flex justify-center bg-gray-200 rounded-md text-md font-medium mb-3 py-1 text-gray-600 shadow-full">
          {variation ? `Cor: ${variation?.color.value}` : 'Nova cor'}
        </div>
        {variation && (
          <div className="flex justify-between items-center">
            <div className="mb-5">
              <h4 className="mb-1 font-medium">Qual tamanho quer editar?</h4>
              <div className="flex gap-4">
                {variation?.sizes.map((size) => (
                  <div className="relative w-fit">
                    <span
                      className={`p-1.5 bg-gray-200 cursor-pointer font-medium rounded-sm ${
                        selectedSize === size
                          ? 'border border-primary-dark'
                          : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.size}
                    </span>
                    <button
                      type="button"
                      className="absolute -right-2 -bottom-2 bg-red-900 rounded-full text-white text-[10px] p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSize(size);
                        setOpenConfirmDialog(true);
                      }}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <PrimaryButton outline onClick={() => setNewSize(true)}>
              Novo tamanho
            </PrimaryButton>
          </div>
        )}
        {((variation && (selectedSize || newSize) && !openConfirmDialog) ||
          !variation) && (
          <Card className="w-full relative">
            <h3 className="font-bold text-lg text-primary-dark">
              Variação do Produto
            </h3>
            <form>
              <GridContainer gap={3}>
                {!selectedSize && (
                  <>
                    {!newSize && (
                      <GridItem size={6}>
                        <InputLabel
                          htmlFor="color"
                          value="Cor"
                          className="mt-4"
                        />
                        <SelectInput
                          options={colorOptions}
                          value={data.color}
                          onChange={(e) => setData('color', e)}
                          placeholder="Selecione uma cor"
                        />
                        <InputError className="mt-2" message={errors.color} />
                        <div className="flex gap-1 items-center mt-1">
                          <p className="text-sm text-gray-600">
                            Não encontrou a cor? Adicionar nova{' '}
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
                    )}

                    <GridItem size={6}>
                      <InputLabel
                        htmlFor="size"
                        value="Tamanho"
                        className="mt-4"
                      />
                      <SelectInput
                        options={sizeOptions}
                        value={data.size}
                        onChange={(e) => setData('size', e)}
                        placeholder="Selecione um tamanho"
                      />
                      <InputError className="mt-2" message={errors.size} />
                      <div className="flex gap-1 items-center mt-1">
                        <p className="text-sm text-gray-600">
                          Não encontrou o tamanho? Adicionar novo
                        </p>
                        <button
                          type="button"
                          // onClick={() => setOpenColorForm(true)}
                          className="text-primary cursor-pointer text-md"
                        >
                          <FaPlusCircle />
                        </button>
                      </div>
                    </GridItem>
                    {newSize && (
                      <GridItem size={6}>
                        <div></div>
                      </GridItem>
                    )}
                  </>
                )}

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
                    <div className="self-end mb-2 ml-3 mt-1">
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
                  Salvar
                </PrimaryButton>
              </div>
            </form>
          </Card>
        )}

        {variation && variation?.images?.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg text-primary-dark mb-2 font-medium">
              Imagens
            </h4>
            <GridContainer gap={3}>
              {variation?.images.map((image) => (
                <GridItem
                  size={4}
                  className="border border-gray-300 rounded-md"
                >
                  <img
                    key={image.id}
                    src={image.url}
                    alt={`Imagem da variação ${variation.color.value}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </GridItem>
              ))}
            </GridContainer>
          </div>
        )}
        {/* Imagens */}
        <button
          type="button"
          className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold ${
            !variation ? 'opacity-50' : 'cursor-pointer hover:bg-gray-100'
          }`}
          onClick={() => setOpenImagesModal(true)}
          disabled={!variation}
        >
          {variation && variation?.images?.length > 0 ? 'Editar' : 'Adicionar'}{' '}
          imagens
        </button>
        {!variation && (
          <p className="mt-2 text-gray-500 text-sm text-center">
            <FaCircleInfo className="inline-block mr-1" />
            Você poderá adicionar as imagens após salvar a nova cor.
          </p>
        )}
        <ImagesFormModal
          open={openImagesModal}
          onClose={() => setOpenImagesModal(false)}
          color={variation?.color}
          newColorId={data.color}
          images={variation?.images || []}
        />
      </Modal>

      <ColorForm open={openColorForm} onClose={() => setOpenColorForm(false)} />

      <ConfirmDialog
        open={openConfirmDialog}
        title="Tem certeza que deseja remover este tamanho?"
        onAccept={() => {
          handleDeleteSize();
          setOpenConfirmDialog(false);
        }}
        onClose={() => {
          setOpenConfirmDialog(false);
          setSelectedSize(null);
        }}
      />
    </>
  );
}
