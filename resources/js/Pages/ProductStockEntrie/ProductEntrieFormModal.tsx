import Card from '@/Components/Card';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import ProductType from '@/Types/ProductType';
import SupplierType from '@/Types/SupplierType';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface ProductEntrieModalProps {
  open: boolean;
  onClose: () => void;
  product: ProductType;
}

const initialItemState = {
  supplier_id: null,
  unit_cost: '',
  quantity: '',
  product_variation_id: null,
};

export default function ProductEntrieModal({
  open,
  onClose,
  product,
}: ProductEntrieModalProps) {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [currentItem, setCurrentItem] = useState(initialItemState);

  const suppliers = usePage().props.suppliers as SupplierType[];

  const supplierOptions = suppliers?.map((supplier) => ({
    label: supplier.name,
    value: supplier.id,
  }));

  const { data, setData, reset, setError, post } = useForm({
    items: [] as {
      supplier_id: number | null;
      unit_cost: string;
      quantity: string;
      product_variation_id: number | null;
    }[],
  });

  const handleAddItem = () => {
    if (!currentItem.product_variation_id || !currentItem.supplier_id) {
      setError('items', 'Campo obrigatório');
      return;
    }

    setData('items', [...data.items, currentItem]);
    setCurrentItem(initialItemState);
    setSelectedColor(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('productStockEntries.store'), {
      onSuccess: () => {
        onClose();
        setSelectedColor(null);
        reset();
        setCurrentItem(initialItemState);
      },
    });
  };

  const colors = product?.variations?.map((item) => {
    return {
      label: item.color.value,
      value: item.color.id,
    };
  });

  const sizes =
    selectedColor &&
    product?.variations
      ?.find((color) => color.color.id === selectedColor)
      ?.sizes.map((size) => {
        return {
          label: size.size,
          value: size.id,
        };
      });

  return (
    <Modal
      show={open}
      onClose={() => {
        onClose();
        setSelectedColor(null);
        setCurrentItem(initialItemState);
        reset();
      }}
    >
      <h3 className="font-bold text-lg text-primary-dark">
        Adicionar entrada de produto
      </h3>
      <form>
        <GridContainer gap={3}>
          <GridItem size={12}>
            <InputLabel htmlFor="color" value="Cor" className="mt-4" />
            <SelectInput
              options={colors}
              value={selectedColor}
              onChange={(e) => setSelectedColor(e)}
              placeholder="Selecione uma cor"
            />
          </GridItem>
          <GridItem size={12}>
            <InputLabel htmlFor="size" value="Tamanho" className="mt-4" />
            <SelectInput
              options={sizes || []}
              value={currentItem.product_variation_id}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, product_variation_id: e })
              }
              placeholder="Selecione um fornecedor"
              disabled={!selectedColor}
            />
          </GridItem>
          <GridItem size={12}>
            <InputLabel
              htmlFor="supplier"
              value="Fornecedor"
              className="mt-4"
            />
            <SelectInput
              options={supplierOptions}
              value={currentItem.supplier_id}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, supplier_id: e })
              }
              placeholder="Selecione um fornecedor"
            />
          </GridItem>
          <GridItem size={6}>
            <InputLabel
              htmlFor="unit_cost"
              value="Custo Unitário"
              className="mt-4"
            />
            <TextInput
              id="unit_cost"
              type="number"
              typeNumber="decimal"
              value={currentItem.unit_cost}
              className="mt-1 block w-full"
              onChange={(e) =>
                setCurrentItem({ ...currentItem, unit_cost: e.target.value })
              }
            />
          </GridItem>
          <GridItem size={6}>
            <InputLabel
              htmlFor="quantity"
              value="Quantidade"
              className="mt-4"
            />
            <TextInput
              id="quantity"
              type="text"
              className="mt-1 block w-full"
              value={currentItem.quantity}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, quantity: e.target.value })
              }
            />
          </GridItem>
        </GridContainer>
        <div className="flex justify-center mt-6">
          <PrimaryButton
            onClick={handleAddItem}
            disabled={
              !currentItem.quantity ||
              !currentItem.unit_cost ||
              !currentItem.supplier_id ||
              !currentItem.product_variation_id
            }
          >
            Adicionar na lista
          </PrimaryButton>
        </div>
        <div className="mt-6">
          {data.items.length === 0 ? (
            <div className="p-3 border border-dashed border-primary w-full rounded-md">
              Nenhum item adicionado. Preencha os campos acima e clique em
              "Adicionar na lista".
            </div>
          ) : (
            <GridContainer gap={3}>
              {data.items.map((item, index) => (
                <GridItem size={6}>
                  <Card className="w-full">
                    <GridContainer>
                      <GridItem size={6}>
                        <b>Cor: </b>{' '}
                        <p>
                          {' '}
                          {
                            product.variations.find((variation) =>
                              variation.sizes.some(
                                (size) => size.id === item.product_variation_id
                              )
                            )?.color.value
                          }
                        </p>
                      </GridItem>
                      <GridItem size={6}>
                        <b>Tamanho: </b>{' '}
                        <p>
                          {' '}
                          {
                            product.variations
                              .find((variation) =>
                                variation.sizes.some(
                                  (size) =>
                                    size.id === item.product_variation_id
                                )
                              )
                              ?.sizes.find(
                                (size) => size.id === item.product_variation_id
                              )?.size
                          }
                        </p>
                      </GridItem>
                      <GridItem size={6}>
                        <b>Valor unitário: </b>
                        <p>{item.unit_cost}</p>
                      </GridItem>
                      <GridItem size={6}>
                        <b>Quantidade: </b>
                        <p>{item.quantity}</p>
                      </GridItem>
                      <GridItem size={12}>
                        <b>Fornecedor: </b>
                        <p>{item.supplier_id}</p>
                      </GridItem>
                    </GridContainer>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          )}
        </div>
        <PrimaryButton
          outline
          className="mt-6 w-full justify-center"
          onClick={handleSubmit}
        >
          Salvar entradas
        </PrimaryButton>
      </form>
    </Modal>
  );
}
