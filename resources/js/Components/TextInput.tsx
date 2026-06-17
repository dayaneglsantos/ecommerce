import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { IMaskInput } from 'react-imask';
import { Tooltip } from 'react-tooltip';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  isFocused?: boolean;
  icon?: React.ReactNode;
  mask?: any;
  tooltip?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeNumber?: 'integer' | 'decimal';
}

export default forwardRef<HTMLInputElement | null, TextInputProps>(
  function TextInput(
    {
      type = 'text',
      className = '',
      isFocused = false,
      icon = null,
      mask,
      tooltip,
      value,
      onChange,
      typeNumber = 'integer',
      ...props
    }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement | null>
  ) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => localRef.current as HTMLInputElement, [
      localRef,
    ]);

    useEffect(() => {
      if (isFocused) {
        localRef.current?.focus();
      }
    }, [isFocused]);

    return (
      <div
        className={
          'relative flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:border-primary-light focus-within:ring-1 focus-within:ring-primary-light ' +
          className
        }
      >
        {mask ? (
          <IMaskInput
            {...props}
            disabled={props.disabled}
            mask={mask}
            type={type}
            ref={localRef}
            className={
              'w-full px-4 py-2 bg-transparent border-none focus:ring-0 focus:border-0 outline-none ' +
              (icon ? 'pr-10' : '')
            }
            onAccept={(value: string) => {
              onChange?.({ target: { value } } as any);
            }}
            value={value}
          />
        ) : (
          <input
            {...props}
            onChange={(e) => {
              if (typeNumber === 'decimal') {
                const value = e.target.value;
                const decimalNumbers = value.split('.')[1];
                if (decimalNumbers && decimalNumbers.length > 2) {
                  return;
                }
                onChange?.(e);
              } else {
                onChange?.(e);
              }
            }}
            type={type}
            ref={localRef}
            value={
              type === 'number' && typeof value === 'string'
                ? value.replace(',', '.')
                : value
            }
            className={
              'w-full px-4 py-2 bg-transparent border-none focus:ring-0 focus:border-0 outline-none no-spinner' +
              (icon ? 'pr-10' : '')
            }
            onWheel={(e) => (e.target as HTMLElement).blur()} // Não permite alterar número com scroll
            onKeyDown={(e) => {
              if (type === 'number') {
                // Não permite 'e', '+', '-' em inputs numéricos e não deixa usar setas para alterar valor
                if (
                  e.key === 'e' ||
                  e.key === 'E' ||
                  e.key === '+' ||
                  e.key === '-' ||
                  e.key === 'ArrowUp' ||
                  e.key === 'ArrowDown'
                ) {
                  e.preventDefault();
                }
                // Não permite '.' ou ',' se for inteiro
                if (
                  typeNumber === 'integer' &&
                  (e.key === '.' || e.key === ',')
                ) {
                  e.preventDefault();
                }
              }
            }}
          />
        )}

        {icon && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            data-tooltip-id={tooltip ? 'tooltip' : undefined}
          >
            {icon}
          </div>
        )}
        {tooltip && <Tooltip id="tooltip">{tooltip}</Tooltip>}
      </div>
    );
  }
);
