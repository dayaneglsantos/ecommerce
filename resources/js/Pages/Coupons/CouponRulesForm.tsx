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
interface CouponRulesFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CouponRulesFormModal({
  open,
  onClose,
}: CouponRulesFormModalProps) {
  const { data, setData, reset, errors, setError, clearErrors, post } = useForm(
    {
      coupon_id: null,
      items: [] as {
        ruleable: {
          type: string;
          id: number;
        };
        condition: 'include' | 'exclude';
      }[],
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
                  setData(`items.0.ruleable.type`, 'brand');
                  setData(`items.0.condition`, 'include');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={
                    data.items[0]?.ruleable.type === 'brand'
                      ? 'warning'
                      : 'default'
                  }
                >
                  Marcas
                </Badge>
              </button>
              <button
                onClick={() => {
                  setData(`items.0.ruleable.type`, 'category');
                  setData(`items.0.condition`, 'include');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={
                    data.items[0]?.ruleable.type === 'category'
                      ? 'warning'
                      : 'default'
                  }
                >
                  Categorias
                </Badge>
              </button>
              <button
                onClick={() => {
                  setData(`items.0.ruleable.type`, 'product');
                  setData(`items.0.condition`, 'include');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={
                    data.items[0]?.ruleable.type === 'product'
                      ? 'warning'
                      : 'default'
                  }
                >
                  Produtos
                </Badge>
              </button>
            </div>
          </GridItem>
          <GridItem size={6}>
            <InputLabel className="mt-2" value="Condição" />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  setData(`items.0.condition`, 'include');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={
                    data.items[0]?.condition === 'include'
                      ? 'warning'
                      : 'default'
                  }
                >
                  Inclusão
                </Badge>
              </button>
              <button
                onClick={() => {
                  setData(`items.0.condition`, 'exclude');
                }}
                type="button"
              >
                <Badge
                  className="cursor-pointer font-bold"
                  type={
                    data.items[0]?.condition === 'exclude'
                      ? 'warning'
                      : 'default'
                  }
                >
                  Exclusão
                </Badge>
              </button>
            </div>
          </GridItem>
        </GridContainer>

        {data.items[0]?.ruleable.type === 'brand' && (
          <BrandRuleable setData={setData} data={data} reset={reset} />
        )}
        {data.items[0]?.ruleable.type === 'category' && (
          <CategoryRuleable setData={setData} data={data} reset={reset} />
        )}
        {data.items[0]?.ruleable.type === 'product' && (
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
