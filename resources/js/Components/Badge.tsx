interface BadgeProps {
  children: React.ReactNode;
  type: 'success' | 'warning' | 'error' | 'info';
}

export default function Badge({ children, type, ...props }: BadgeProps) {
  const typeClasses = {
    success: 'bg-green-200 text-green-800',
    warning: 'bg-orange-100 text-orange-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
  };

  return (
    <span className={'rounded-xl p-1 text-sm ' + typeClasses[type]} {...props}>
      {children}
    </span>
  );
}
