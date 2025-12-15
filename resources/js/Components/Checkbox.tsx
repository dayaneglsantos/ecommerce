interface CheckboxProps {
  className?: string;
  [key: string]: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  className = '',
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <input
      {...props}
      onChange={onChange}
      type="checkbox"
      className={
        'rounded border-gray-300 text-primary shadow-sm focus:ring-primary ' +
        className
      }
    />
  );
}
