import CalendarInput from '@/Components/CalendarInput';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LuClock } from 'react-icons/lu';

interface CouponFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CouponFormModal({
  open,
  onClose,
}: CouponFormModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, setData, reset, errors } = useForm({
    type: '',
    code: '',
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
    // ajustar
  };

  console.log('form data:', data);

  return (
    <Modal show={open} onClose={onClose}>
      <h3 className="font-bold text-lg text-primary-dark">Novo cupom</h3>

      <form>
        <GridContainer gap={3}>
          <GridItem size={12}>
            <InputLabel htmlFor="type" value="Tipo de cupom" className="mt-4" />
            <SelectInput
              options={[
                { label: 'Produto', value: 'product' },
                { label: 'Entrega', value: 'shipping' },
              ]}
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              placeholder="Selecione um tipo de cupom"
            />
          </GridItem>
          <GridItem size={12}>
            <InputLabel htmlFor="code" value="Código" className="mt-4" />
            <TextInput
              id="code"
              type="text"
              value={data.code}
              className="mt-1 block w-full"
              onChange={(e) => setData('code', e.target.value)}
            />
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
                <InputError className="mt-2" message={errors.discount_value} />
              </div>
              <div className="self-end mb-2 ml-3 mt-1">
                <div className="flex items-center gap-1">
                  <Checkbox
                    onChange={(e) => {
                      setData('discount_type', 'percentage');
                      setData('discount_value', '');
                    }}
                    checked={data.discount_type === 'percentage'}
                  />
                  <InputLabel value="Porcentagem (%)" />
                </div>
                <div className="flex items-center gap-1">
                  <Checkbox
                    onChange={(e) => {
                      setData('discount_type', 'fixed');
                      setData('discount_value', '');
                    }}
                    checked={data.discount_type === 'fixed'}
                  />
                  <InputLabel value="Valor fixo" />
                </div>
              </div>
            </div>
          </GridItem>
          <GridItem size={6}>
            <CalendarInput value={startDate} onChange={setStartDate} />
            <TextInput
              mask={'00:00'}
              className="mt-1 block w-full"
              value={''}
              onChange={(e) => {
                const time = e.target.value;
                setData(
                  'start_date',
                  dayjs(`${startDate} ${time}`)
                    .startOf('minute')
                    .format('YYYY-MM-DD HH:mm')
                );
              }}
              required
              icon={<LuClock />}
              disabled={!startDate}
            />
          </GridItem>
          <GridItem size={6}>
            <CalendarInput value={endDate} onChange={setEndDate} />
            <TextInput
              mask={'00:00'}
              className="mt-1 block w-full"
              value={''}
              onChange={(e) => {
                const time = e.target.value;
                setData(
                  'end_date',
                  dayjs(`${endDate} ${time}`)
                    .endOf('minute')
                    .format('YYYY-MM-DD HH:mm')
                );
              }}
              required
              icon={<LuClock />}
              disabled={!endDate}
            />
          </GridItem>
          <GridItem size={6}>
            <InputLabel
              htmlFor="available_quantity"
              value="Quantidade disponível"
              className="mt-4"
            />
            <TextInput
              id="available_quantity"
              type="number"
              value={data.available_quantity}
              className="mt-1 block w-full"
              onChange={(e) => setData('available_quantity', e.target.value)}
            />
          </GridItem>
          <GridItem size={6}>
            <InputLabel
              htmlFor="available_per_user"
              value="Quantidade disponível por usuário"
              className="mt-4"
            />
            <TextInput
              id="available_per_user"
              type="number"
              value={data.available_per_user}
              className="mt-1 block w-full"
              onChange={(e) => setData('available_per_user', e.target.value)}
            />
          </GridItem>
          <GridItem size={6}>
            <InputLabel
              htmlFor="minimum_order_value"
              value="Valor mínimo da compra"
              className="mt-4"
            />
            <TextInput
              id="minimum_order_value"
              type="number"
              typeNumber="decimal"
              value={data.minimum_order_value}
              className="mt-1 block w-full"
              onChange={(e) => setData('minimum_order_value', e.target.value)}
            />
          </GridItem>
        </GridContainer>
        <div className="flex gap-2 justify-end">
          <PrimaryButton outline onClick={close}>
            Cancelar
          </PrimaryButton>
          <PrimaryButton onClick={submit}>Salvar</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
