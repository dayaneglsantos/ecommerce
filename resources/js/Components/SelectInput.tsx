import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Portal,
} from '@headlessui/react';
import { FaCaretDown } from 'react-icons/fa6';
import { IoMdCheckmark } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

interface SelectInputProps {
  options: { value: string | number; label: string }[];
  value: any;
  multiple?: boolean;
  onChange?: (value: any) => void;
  placeholder?: string;
  resetSelected?: () => void;
  disabled?: boolean;
}

export default function SelectInput({
  options,
  value,
  multiple = false,
  onChange,
  placeholder = 'Selecione...',
  resetSelected,
  disabled = false,
}: SelectInputProps) {
  const selectedLabels =
    Array.isArray(value) &&
    options
      .filter((option) => value.includes(option.value))
      .map((option) => option.label);

  const getSelectedOptions = () => {
    if (value?.length === 0 || value === null || value === undefined) {
      return <span className="text-gray-400">{placeholder}</span>;
    }
    if (multiple && selectedLabels) {
      return (
        <div className="flex gap-1 overflow-x-hidden whitespace-nowrap">
          {selectedLabels.map((item) => (
            <span
              key={item}
              className="px-1  bg-gray-200 rounded-md whitespace-nowrap max-w-[150px] overflow-hidden text-ellipsis shrink-0"
            >
              {item}
            </span>
          ))}
        </div>
      );
    } else {
      const selectedLabel = options.find(
        (option) => option.value === value
      )?.label;
      return <span>{selectedLabel}</span>;
    }
  };

  return (
    <div className="relative w-full">
      <Listbox
        multiple={multiple}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        <ListboxButton
          className={
            'w-full p-2 flex items-center justify-between bg-white border border-gray-300 rounded-md shadow-sm focus-within:border-primary-light focus-within:ring-1 focus-within:ring-primary-light outline-none '
          }
        >
          {getSelectedOptions()}
          <div className="flex items-center gap-2">
            {multiple && value.length > 0 && (
              <IoClose
                className="hover:bg-gray-100 text-gray-400 p-1 rounded-full text-2xl ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  resetSelected && resetSelected();
                }}
              />
            )}
            <FaCaretDown className="text-gray-400" />
          </div>
        </ListboxButton>
        {options?.length > 0 ? (
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
        ) : (
          <ListboxOptions
            className={`absolute z-10 w-full bg-gray-100 p-2 rounded-b-md outline-none mt-1 transition duration-100 ease-out max-h-[200px] overflow-y-auto shadow-full`}
            modal={false}
          >
            <ListboxOption className={`p-1 px-2 rounded-md`} value={''}>
              <div className="flex items-center justify-between text-gray-400">
                <span>Nenhuma opção disponível</span>
              </div>
            </ListboxOption>
          </ListboxOptions>
        )}
      </Listbox>
    </div>
  );
}
