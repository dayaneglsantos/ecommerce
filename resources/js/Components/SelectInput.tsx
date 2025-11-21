import { Select } from '@headlessui/react';

interface SelectInputProps {
  options: { value: string; label: string }[];
  id: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({
  options,
  value,
  ...props
}: SelectInputProps) {
  return (
    <div
      className={
        'relative flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:border-primaryLight focus-within:ring-1 focus-within:ring-primaryLight mt-1'
      }
    >
      <Select
        className={`w-full px-4 py-2 bg-transparent border-none focus:ring-0 focus:border-0 outline-none focus:outline-none rounded-md appearance-none `}
        {...props}
        value={value}
      >
        <option value="" disabled hidden>
          Selecione
        </option>
        {options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
