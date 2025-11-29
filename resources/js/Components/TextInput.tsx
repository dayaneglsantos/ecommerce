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
          'relative flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:border-primaryLight focus-within:ring-1 focus-within:ring-primaryLight ' +
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
            onChange={onChange}
            type={type}
            ref={localRef}
            value={value}
            className={
              'w-full px-4 py-2 bg-transparent border-none focus:ring-0 focus:border-0 outline-none ' +
              (icon ? 'pr-10' : '')
            }
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
