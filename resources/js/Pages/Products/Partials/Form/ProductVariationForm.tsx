import Card from '@/Components/Card';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function ProductVariationForm() {
  const { data, setData, reset, post, errors } = useForm({
    color: '',
  });

  return (
    <Card>
      <form>
        <div>
          <InputLabel
            htmlFor="technical_specifications"
            value="Especificações Técnicas"
            className="mt-4"
          />
          <TextInput
            id="color"
            name="color"
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('color', e.target.value)}
          />
          {/* <InputError className="mt-2" message={errors.technical_specifications} /> */}
        </div>
      </form>
    </Card>
  );
}
