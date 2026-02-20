import Badge from '@/Components/Badge';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import { Input } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import BrandRuleable from './Partials/BrandRuleable';
import { useState } from 'react';
import ProductsRuleable from './Partials/ProductsRuleable';
import CategoryRuleable from './Partials/CategoryRuleable';

export interface CouponRulesFormType {
  coupon_id: number | null;
  brand: {
    items: any[];
    rule: string;
  };
  category: {
    items: any[];
    rule: string;
  };
  product: {
    items: any[];
    rule: string;
  };
}
interface CouponRulesFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CouponRulesFormModal({
  open,
  onClose,
}: CouponRulesFormModalProps) {
  const [selectedType, setSelectedType] = useState<
    'brand' | 'category' | 'product' | null
  >(null);

  const { data, setData, reset, errors, setError, clearErrors, post } = useForm(
    {
      coupon_id: null,
      brand: {
        items: [],
        rule: 'include',
      },
      category: {
        items: [],
        rule: 'include',
      },
      product: {
        items: [],
        rule: 'include',
      },
    }
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    // post(route('coupons.store'), {
    //   onSuccess: () => {
    //     onClose();
    //     reset();
    //   },
    //   onError: (errors) => {
    //     console.log(errors);
    //   },
    // });
  };

  console.log(data);

  return (
    <Modal
      show={open}
      onClose={() => {
        onClose();
        reset();
      }}
      maxWidth="4xl"
    >
      <h3 className="font-bold text-lg text-primary-dark mb-4">
        Regras do cupom
      </h3>

      <p>Aqui você deve selecionar os itens que o cupom irá afetar.</p>

      <form>
        <GridContainer gap={3}>
          <GridItem size={6}>
            <InputLabel className="mt-2" value="Aplicação para:" />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  setSelectedType('brand');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={selectedType === 'brand' ? 'warning' : 'default'}
                >
                  Marcas
                </Badge>
              </button>
              <button
                onClick={() => {
                  setSelectedType('category');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={selectedType === 'category' ? 'warning' : 'default'}
                >
                  Categorias
                </Badge>
              </button>
              <button
                onClick={() => {
                  setSelectedType('product');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={selectedType === 'product' ? 'warning' : 'default'}
                >
                  Produtos
                </Badge>
              </button>
            </div>
          </GridItem>
          {selectedType && (
            <GridItem size={6}>
              <InputLabel className="mt-2" value="Condição" />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => {
                    setData(`${selectedType}.rule`, 'include');
                  }}
                  type="button"
                >
                  <Badge
                    className="cursor-pointer font-bold"
                    type={
                      data[selectedType]?.rule === 'include'
                        ? 'warning'
                        : 'default'
                    }
                  >
                    Inclusão
                  </Badge>
                </button>
                <button
                  onClick={() => {
                    setData(`${selectedType}.rule`, 'exclude');
                  }}
                  type="button"
                >
                  <Badge
                    className="cursor-pointer font-bold"
                    type={
                      data[selectedType as keyof typeof data]?.rule ===
                      'exclude'
                        ? 'warning'
                        : 'default'
                    }
                  >
                    Exclusão
                  </Badge>
                </button>
              </div>
            </GridItem>
          )}
        </GridContainer>

        {selectedType === 'brand' && (
          <BrandRuleable setData={setData} data={data} reset={reset} />
        )}
        {selectedType === 'category' && (
          <CategoryRuleable setData={setData} data={data} reset={reset} />
        )}
        {selectedType === 'product' && (
          <ProductsRuleable setData={setData} data={data} reset={reset} />
        )}

        <div className="flex gap-2 justify-end mt-6">
          <PrimaryButton outline onClick={onClose}>
            Cancelar
          </PrimaryButton>
          <PrimaryButton onClick={submit}>Salvar</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
