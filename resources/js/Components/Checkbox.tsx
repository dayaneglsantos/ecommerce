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
        'cursor-pointer rounded border-gray-300 text-primary shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-0 ' +
        className
      }
    />
  );
}
