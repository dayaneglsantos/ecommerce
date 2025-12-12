import Card from '@/Components/Card';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import SupplierType from '@/Types/SupplierType';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { IoIosAddCircle, IoMdInformationCircle } from 'react-icons/io';

export default function ProductVariationForm({
  suppliers,
}: {
  suppliers: SupplierType[];
}) {
  const [specificationName, setSpecificationName] = useState('');
  const [specificationDescription, setSpecificationDescription] = useState('');

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
    supplier_id: [],
    pix_discount_percent: '',
  });

  const suppliersOptions = suppliers?.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  const handleAddSpecification = () => {
    if (specificationName && specificationDescription) {
      setData('technical_specifications', {
        ...data.technical_specifications,
        [specificationName]: specificationDescription,
      });
      setSpecificationName('');
      setSpecificationDescription('');
    }
  };

  const specificationsSize = Object.entries(
    data.technical_specifications
  ).length;
  console.log(data);

  return (
    <Card className="w-full">
      <h3 className="font-bold text-lg text-primaryDark">
        Variação do Produto
      </h3>
      <form>
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3">
            <InputLabel htmlFor="color" value="Cor" className="mt-4" />
            <TextInput
              id="color"
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
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('size', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
          <div className="col-span-3">
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
              className="mt-1 block w-full"
              onChange={(e) => setData('sku', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
          <div className="col-span-3">
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
            {/* <InputError className="mt-2" message={errors.supplier_id} /> */}
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="stock_quantity"
              value="Quantidade em estoque"
              className="mt-4"
            />
            <TextInput
              id="stock_quantity"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('stock_quantity', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
          <div className="col-span-3">
            <InputLabel htmlFor="price" value="Preço" className="mt-4" />
            <TextInput
              id="price"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('price', e.target.value)}
            />
            {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
          </div>
          <div className="col-span-3">
            <InputLabel
              htmlFor="pix_discount_percent"
              value="Desconto PIX (%)"
              className="mt-4"
            />
            <TextInput
              id="pix_discount_percent"
              type="text"
              className="mt-1 block w-full"
              value={data.pix_discount_percent}
              onChange={(e) => {
                if (
                  Number(e.target.value) < 0 ||
                  Number(e.target.value) > 100 ||
                  isNaN(Number(e.target.value))
                )
                  return;
                setData('pix_discount_percent', e.target.value);
              }}
            />
            {/* <InputError className="mt-2" message={errors.pix_discount_percent} /> */}
          </div>
        </div>
        <h4 className="font-bold mt-5">Espeficicações técnicas</h4>

        <div className="flex items-center mb-5">
          <div className="grid grid-cols-6 gap-3 grow mt-3">
            <div className="col-span-6 md:col-span-3">
              <InputLabel htmlFor="price" value="Tipo" />
              <TextInput
                id="price"
                type="text"
                value={specificationName}
                className="mt-1 block w-full"
                onChange={(e) => setSpecificationName(e.target.value)}
              />
              {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
            </div>
            <div className="col-span-6 md:col-span-3">
              <InputLabel htmlFor="price" value="Descrição" />
              <TextInput
                id="price"
                value={specificationDescription}
                type="text"
                className="mt-1 block w-full"
                onChange={(e) => setSpecificationDescription(e.target.value)}
              />
              {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
            </div>
          </div>
          <IoIosAddCircle
            className="text-2xl mt-8 ml-3 cursor-pointer text-primaryDark"
            onClick={handleAddSpecification}
          />
        </div>
        {specificationsSize > 0 && (
          <div className="w-full shadow-full p-3 rounded-2xl my-5">
            {Object.entries(data.technical_specifications).map(
              ([key, value]) => (
                <div key={key} className="flex items-center mt-2 gap-3 ">
                  <p>
                    <b>{key}: </b>
                    {value as React.ReactNode}
                  </p>
                </div>
              )
            )}
          </div>
        )}
        <div className="flex justify-end my-3 mt-6">
          <PrimaryButton>Salvar Variação</PrimaryButton>
        </div>
      </form>
    </Card>
  );
}
