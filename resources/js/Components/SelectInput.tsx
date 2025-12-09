import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Portal,
} from '@headlessui/react';
import { ChangeEvent, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

interface SelectInputProps {
  options: { value: string; label: string }[];
  id: string;
  name?: string;
  value: any;
  multiple?: boolean;
  onChange?: (value: any) => void;
}

export default function SelectInput({
  options,
  value,
  multiple = false,
  onChange,
  ...props
}: SelectInputProps) {
  const getSelectedOptions = () => {
    if (value.length === 0) {
      return 'Selecione...';
    }
    if (multiple) {
      const selectedLabels = options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label);
      return selectedLabels.join(', ');
    } else {
      const selectedLabel = options.find(
        (option) => option.value === value
      )?.label;
      return selectedLabel;
    }
  };

  return (
    <div className="relative w-full">
      <Listbox multiple={multiple} onChange={onChange}>
        <ListboxButton
          className={
            'w-full p-2 flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:border-primaryLight focus-within:ring-1 focus-within:ring-primaryLight outline-none'
          }
        >
          <span>{getSelectedOptions()}</span>
        </ListboxButton>
        {options.length > 0 && (
          <ListboxOptions
            className={`absolute z-10 w-full bg-gray-100 p-2 rounded-b-md outline-none mt-1 transition duration-100 ease-out max-h-[200px] overflow-y-auto shadow-full`}
            modal={false}
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={`hover:bg-gray-200 p-1 px-2 rounded-md`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {(Array.isArray(value)
                    ? value.includes(option.value)
                    : value === option.value) && (
                    <IoMdCheckmark className="text-secondaryDark" />
                  )}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        )}
      </Listbox>
    </div>
  );
}
