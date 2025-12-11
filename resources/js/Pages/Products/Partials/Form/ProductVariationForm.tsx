import Card from '@/Components/Card';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { IoMdInformationCircle } from 'react-icons/io';

export default function ProductVariationForm() {
  const { data, setData, reset, post, errors } = useForm({
    product_id: '',
    color: '',
    color_code: '',
    size: '',
    price: '',
    old_price: '',
    stock_quantity: '',
    technical_specifications: {},
    sku: '',
    supplier_id: '',
    pix_discount_percent: '',
  });

  return (
    <Card className="w-full">
      <form>
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3">
            <InputLabel htmlFor="color" value="Cor" className="mt-4" />
            <TextInput
              id="color"
              name="color"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('color', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="color_code"
              value="Código da cor"
              className="mt-4"
              icon={<IoMdInformationCircle />}
              iconText="Código hexadecimal da cor. Ex: #FFFFFF"
            />
            <TextInput
              id="color_code"
              name="color_code"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('color_code', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
          <div className="col-span-3">
            <InputLabel htmlFor="size" value="Tamanho" className="mt-4" />
            <TextInput
              id="size"
              name="size"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('size', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
          <div className="col-span-3">
            <InputLabel htmlFor="price" value="Preço" className="mt-4" />
            <TextInput
              id="price"
              name="price"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('price', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
        </div>
      </form>
    </Card>
  );
}
