interface PrimaryButtonProps {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  [key: string]: any;
  outline?: boolean;
}

export default function PrimaryButton({
  className = '',
  disabled,
  children,
  outline,
  ...props
}: PrimaryButtonProps) {
  const outlineClasses =
    'text-primary border border-primary hover:bg-primary-light hover:text-primary-dark focus:ring-offset-white active:bg-gray-100';
  const normalClasses =
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark';
  return (
    <button
      {...props}
      className={
        `inline-flex items-center rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none ${
          outline ? outlineClasses : normalClasses
        } ${disabled ? 'opacity-25' : ''} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
