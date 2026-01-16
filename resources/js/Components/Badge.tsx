interface BadgeProps {
  children: React.ReactNode;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Badge({
  children,
  type = 'default',
  className = '',
  size = 'md',
  ...props
}: BadgeProps & { className?: string }) {
  const typeClasses = {
    success: 'bg-green-200 text-green-800',
    warning: 'bg-orange-100 text-orange-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
    default: 'bg-gray-200 text-gray-800',
  };
  const sizeClasses = {
    sm: 'text-[11px] px-1 py-0.5',
    md: 'text-[12px] px-2 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={
        'rounded-xl inline-block ' +
        sizeClasses[size] +
        ' ' +
        className +
        ' ' +
        typeClasses[type]
      }
      {...props}
    >
      {children}
    </span>
  );
}
