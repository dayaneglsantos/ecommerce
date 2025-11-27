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
    'text-primary border border-primary hover:bg-primaryLight hover:text-primaryDark focus:ring-primary focus:ring-offset-white active:bg-gray-100';
  const normalClasses =
    'bg-primary text-white hover:bg-primaryDark focus:ring-indigo-500 focus:ring-offset-2 active:bg-primaryDark';
  return (
    <button
      {...props}
      className={
        `inline-flex items-center rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          outline ? outlineClasses : normalClasses
        } ${disabled ? 'opacity-25' : ''} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
