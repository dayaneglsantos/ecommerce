export default function Card({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={`p-3 shadow-full rounded-lg w-fit ${className}`} {...props}>
      {children}
    </div>
  );
}
