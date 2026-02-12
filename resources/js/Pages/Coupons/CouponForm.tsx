import CalendarInput from '@/Components/CalendarInput';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import ContentContainer from '@/Components/ContentContainer';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Input } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';
import { LuClock } from 'react-icons/lu';
import CouponRulesFormModal from './CouponRulesForm';
import { CouponType } from '@/Types/CouponType';

interface CouponFormProps {
  open: boolean;
  onClose: () => void;
}

export default function CouponForm({ open, onClose }: CouponFormProps) {
  const coupon = usePage().props.coupon as CouponType;

  console.log(coupon);

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [openRulesModal, setOpenRulesModal] = useState(false);

  const { data, setData, reset, errors, setError, clearErrors, post, patch } =
    useForm({
      type: '',
      code: '',
      description: '',
      discount_type: '',
      discount_value: '',
      start_date: '',
      end_date: '',
      available_quantity: '',
      available_per_user: '',
      minimum_order_value: '',
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (coupon) {
      patch(route('coupons.update', coupon.id), {
        onSuccess: () => {
          onClose();
        },
        onError: (errors) => {
          console.log(errors);
        },
      });
    } else {
      post(route('coupons.store'), {
        onSuccess: () => {
          onClose();
          reset();
          setStartDate('');
          setStartTime('');
          setEndDate('');
          setEndTime('');
        },
        onError: (errors) => {
          console.log(errors);
        },
      });
    }
  };

  useEffect(() => {
    if (coupon) {
      setData('type', coupon.type);
      setData('code', coupon.code);
      setData('description', coupon.description);
      setData('discount_type', coupon.discount.type);
      setData('discount_value', coupon.discount.value || '');
      setData('available_quantity', coupon.availableQuantity || '');
      setData('available_per_user', coupon.availablePerUser || '');
      setData('minimum_order_value', coupon.minimumOrderValue || '');
      setData(
        'start_date',
        coupon.startDate
          ? dayjs(coupon.startDate).format('YYYY-MM-DD HH:mm')
          : ''
      );
      setData(
        'end_date',
        coupon.endDate ? dayjs(coupon.endDate).format('YYYY-MM-DD HH:mm') : ''
      );
      setStartDate(
        coupon.startDate ? dayjs(coupon.startDate).format('YYYY-MM-DD') : ''
      );
      setStartTime(
        coupon.startDate ? dayjs(coupon.startDate).format('HH:mm') : ''
      );
      setEndDate(
        coupon.endDate ? dayjs(coupon.endDate).format('YYYY-MM-DD') : ''
      );
      setEndTime(coupon.endDate ? dayjs(coupon.endDate).format('HH:mm') : '');
    }
  }, [coupon]);

  useEffect(() => {
    if (endDate && dayjs(startDate).isAfter(endDate)) {
      setError(
        'start_date',
        'A data de início não pode ser posterior à data de término'
      );
    } else if (dayjs(startDate).isBefore(dayjs().startOf('day'))) {
      setError(
        'start_date',
        'A data de início não pode ser anterior à data atual'
      );
    } else {
      clearErrors('start_date');
      if (startTime.length === 5) {
        setData(
          'start_date',
          dayjs(`${startDate} ${startTime}`)
            .startOf('minute')
            .format('YYYY-MM-DD HH:mm')
        );
      }
    }
  }, [startDate]);

  useEffect(() => {
    if (startTime.length === 5) {
      const isValid = dayjs(startTime, 'HH:mm', true).isValid();

      if (!isValid) {
        setError('start_date', 'Hora inválida');
      } else {
        clearErrors('start_date');
        setData(
          'start_date',
          dayjs(`${startDate} ${startTime}`)
            .startOf('minute')
            .format('YYYY-MM-DD HH:mm')
        );
      }
    }
  }, [startTime]);

  useEffect(() => {
    if (dayjs(endDate).isBefore(startDate)) {
      setError(
        'end_date',
        'A data de término não pode ser anterior à data de início'
      );
    } else {
      clearErrors('end_date');
    }
  }, [endDate]);

  useEffect(() => {
    if (endTime.length === 5) {
      const isValid = dayjs(endTime, 'HH:mm', true).isValid();

      if (!isValid) {
        setError('end_date', 'Hora inválida');
      } else if (
        endDate === startDate &&
        !dayjs(endTime, 'HH:mm').isAfter(dayjs(startTime, 'HH:mm'))
      ) {
        setError(
          'end_date',
          'A hora de término não pode ser anterior à hora de início'
        );
      } else {
        clearErrors('end_date');
        setData(
          'end_date',
          dayjs(`${endDate} ${endTime}`)
            .endOf('minute')
            .format('YYYY-MM-DD HH:mm')
        );
      }
    }
  }, [endTime]);

  console.log(data);

  return (
    <AuthenticatedLayout>
      <Head title="Entradas de Produtos" />

      <ContentContainer>
        <h3 className="font-bold text-lg text-primary-dark mb-6">Novo cupom</h3>
        <Card className="w-full">
          <form>
            <GridContainer gap={3}>
              <GridItem size={6}>
                <InputLabel
                  htmlFor="type"
                  value="Tipo de cupom"
                  className="mb-1"
                />
                <SelectInput
                  options={[
                    { label: 'Produto', value: 'product' },
                    { label: 'Entrega', value: 'shipping' },
                  ]}
                  value={data.type}
                  onChange={(e) => setData('type', e)}
                  placeholder="Selecione um tipo de cupom"
                />
                <InputError className="mt-2" message={errors.type} />
              </GridItem>
              <GridItem size={6}>
                <InputLabel htmlFor="code" value="Código" />
                <TextInput
                  id="code"
                  type="text"
                  value={data.code}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('code', e.target.value)}
                />
                <InputError className="mt-2" message={errors.code} />
              </GridItem>
              <GridItem size={12}>
                <textarea
                  className="border-gray-300 focus:border-primary-light focus:ring-primary-light rounded-md shadow-sm w-full mt-4 p-2"
                  rows={3}
                  placeholder="Descrição do cupom (opcional)"
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                />
                <InputError className="mt-2" message={errors.description} />
              </GridItem>
              <GridItem size={7}>
                <InputLabel htmlFor="discount_value" value="Desconto" />
                <div className="flex gap-3">
                  <div className="grow">
                    <TextInput
                      id="discount_value"
                      type="number"
                      typeNumber={
                        data.discount_type === 'fixed' ? 'decimal' : 'integer'
                      }
                      className="mt-1 block w-full"
                      value={data.discount_value}
                      onChange={(e) => {
                        if (data.discount_type === 'percentage') {
                          if (
                            Number(e.target.value) < 0 ||
                            Number(e.target.value) > 100 ||
                            isNaN(Number(e.target.value))
                          )
                            return;
                        }
                        setData('discount_value', e.target.value);
                      }}
                    />
                  </div>

                  <div className="flex gap-2 w-full">
                    <div className="flex items-center gap-1">
                      <Checkbox
                        onChange={(e) => {
                          setData('discount_type', 'percentage');
                        }}
                        checked={data.discount_type === 'percentage'}
                      />
                      <InputLabel value="Porcentagem (%)" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox
                        onChange={(e) => {
                          setData('discount_type', 'fixed');
                        }}
                        checked={data.discount_type === 'fixed'}
                      />
                      <InputLabel value="Valor fixo" />
                    </div>
                  </div>
                </div>
                {(errors.discount_value || errors.discount_type) && (
                  <InputError
                    className="mt-2"
                    message={errors.discount_value || errors.discount_type}
                  />
                )}
              </GridItem>
              <GridItem size={5}>
                <InputLabel
                  htmlFor="minimum_order_value"
                  value="Valor mínimo da compra"
                  icon={<IoMdInformationCircle />}
                  iconText="Caso não seja preenchido, este poderá ser usado em compras de qualquer valor"
                />
                <TextInput
                  id="minimum_order_value"
                  type="number"
                  typeNumber="decimal"
                  value={data.minimum_order_value}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData('minimum_order_value', e.target.value)
                  }
                />
                <InputError
                  className="mt-2"
                  message={errors.minimum_order_value}
                />
              </GridItem>
              <GridItem size={6}>
                <InputLabel
                  htmlFor="start_date"
                  value="Data de início"
                  className="mb-1"
                />
                <div className="flex items-center gap-3">
                  <CalendarInput
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                  />
                  <TextInput
                    mask={'00:00'}
                    placeholder="00:00"
                    value={startTime}
                    onChange={(e) => {
                      const time = e.target.value;
                      setStartTime(time);
                    }}
                    required
                    icon={<LuClock />}
                    disabled={
                      !startDate ||
                      (endDate && dayjs(startDate).isAfter(endDate)) ||
                      dayjs(startDate).isBefore(dayjs().startOf('day'))
                    }
                  />
                </div>
                <InputError
                  className="mt-2 block"
                  message={errors.start_date}
                />
              </GridItem>
              <GridItem size={6}>
                <InputLabel
                  htmlFor="end_date"
                  value="Data de término"
                  className="mb-1"
                />
                <div className="flex items-center gap-3">
                  <CalendarInput
                    value={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                  />
                  <TextInput
                    mask={'00:00'}
                    value={endTime}
                    placeholder="00:00"
                    onChange={(e) => {
                      const time = e.target.value;
                      setEndTime(time);
                    }}
                    required
                    icon={<LuClock />}
                    disabled={!endDate || dayjs(endDate).isBefore(startDate)}
                  />
                </div>
                <InputError className="mt-2" message={errors.end_date} />
              </GridItem>
              <GridItem size={6}>
                <InputLabel
                  htmlFor="available_quantity"
                  value="Quantidade disponível"
                />
                <TextInput
                  id="available_quantity"
                  type="number"
                  value={data.available_quantity}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData('available_quantity', e.target.value)
                  }
                />
                <InputError
                  className="mt-2"
                  message={errors.available_quantity}
                />
              </GridItem>
              <GridItem size={6}>
                <InputLabel
                  htmlFor="available_per_user"
                  value="Quantidade disponível por usuário"
                />
                <TextInput
                  id="available_per_user"
                  type="number"
                  value={data.available_per_user}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData('available_per_user', e.target.value)
                  }
                />
                <InputError
                  className="mt-2"
                  message={errors.available_per_user}
                />
              </GridItem>
            </GridContainer>

            <div className="py-3 border-b-2 border-dashed border-gray-200 w-full" />

            <h3 className="font-bold text-md text-primary-dark mt-6">
              Regras do cupom
            </h3>

            <div>
              <button
                type="button"
                className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold
              ${false ? 'opacity-50' : 'cursor-pointer hover:bg-gray-100'}
              `}
                onClick={() => setOpenRulesModal(true)}
              >
                Adicionar regra de cupom
              </button>
            </div>

            <div className="flex gap-2 justify-end mt-6">
              <PrimaryButton outline onClick={close}>
                Cancelar
              </PrimaryButton>
              <PrimaryButton onClick={submit}>Salvar</PrimaryButton>
            </div>
          </form>
        </Card>
      </ContentContainer>

      <CouponRulesFormModal
        open={openRulesModal}
        onClose={() => setOpenRulesModal(false)}
      />
    </AuthenticatedLayout>
  );
}
