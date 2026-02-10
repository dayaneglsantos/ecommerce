import Badge from '@/Components/Badge';
import CalendarInput from '@/Components/CalendarInput';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import { Input } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';
import { LuClock } from 'react-icons/lu';

interface CouponRulesFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CouponRulesFormModal({
  open,
  onClose,
}: CouponRulesFormModalProps) {
  const brands = usePage().props.brands as BrandType[];
  const categories = usePage().props.categories as CategoryType[];

  const brandOptions = brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    search: '',
  });

  console.log(categories);

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

  console.log('form data:', data);

  return (
    <Modal
      show={open}
      onClose={() => {
        onClose();
        reset();
      }}
      maxWidth="3xl"
    >
      <h3 className="font-bold text-lg text-primary-dark mb-6">Novo cupom</h3>

      <p>Aqui você deve selecionar os itens que o cupom irá afetar.</p>

      <form>
        <GridContainer gap={3}>
          <GridItem size={12}>
            <InputLabel className="mt-2" value="Aplicação para:" />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setData(`items.0.ruleable.type`, 'brand')}
                type="button"
              >
                <Badge
                  className="cursor-pointer"
                  type={
                    data.items[0]?.ruleable.type === 'brand'
                      ? 'info'
                      : 'default'
                  }
                >
                  Marcas
                </Badge>
              </button>
              <button
                onClick={() => setData(`items.0.ruleable.type`, 'category')}
                type="button"
              >
                <Badge
                  className="cursor-pointer"
                  type={
                    data.items[0]?.ruleable.type === 'category'
                      ? 'info'
                      : 'default'
                  }
                >
                  Categorias
                </Badge>
              </button>
              <button
                onClick={() => setData(`items.0.ruleable.type`, 'product')}
                type="button"
              >
                <Badge
                  className="cursor-pointer"
                  type={
                    data.items[0]?.ruleable.type === 'product'
                      ? 'info'
                      : 'default'
                  }
                >
                  Marcas
                </Badge>
              </button>
            </div>

            {/* Filtros quando for para produtos*/}
          </GridItem>
          {/* <GridItem size={6}>
            <InputLabel htmlFor="search" value="Descrição" />
            <TextInput
              id="search"
              type="text"
              value={filters.search}
              className="mt-1 block w-full"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </GridItem> */}
          {data.items[0]?.ruleable.type === 'brand' && (
            <GridItem size={6}>
              <InputLabel value="Marcas" className="mb-1" />
              <SelectInput
                options={brandOptions}
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e })}
                placeholder="Marca"
              />
            </GridItem>
          )}
          {/* <GridItem size={6}>
            <InputLabel value="Categorias" className="mb-1" />
            <SelectInput
              options={categoryOptions}
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e })}
              placeholder="Categoria"
            />
          </GridItem> */}
        </GridContainer>
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
