import CalendarInput from '@/Components/CalendarInput';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { LuClock } from 'react-icons/lu';

interface CouponFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CouponFormModal({
  open,
  onClose,
}: CouponFormModalProps) {
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
            <CalendarInput value={''} onChange={() => {}} />
            <TextInput
              mask={'00.000-000'}
              id="zip_code"
              className="mt-1 block w-full"
              value={''}
              // onChange={(e) => {
              //   if (editingAddressId === null) return;
              //   setData('zip_code', e.target.value.replace(/\D/g, ''));
              // }}
              required
              icon={<LuClock />}
            />
          </GridItem>
        </GridContainer>
      </form>
    </Modal>
  );
}
