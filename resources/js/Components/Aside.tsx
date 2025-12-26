interface AsideProps {
  position?: 'left' | 'right';
  children: React.ReactNode;
  width?: string;
}

export default function Sidebar({
  position = 'right',
  children,
  width,
}: AsideProps) {
  return (
    <aside
      className={`fixed z-40 top-16 p-3 border-gray-100 shadow-lg bg-gray-100 h-svh ${
        position === 'left' ? 'border-r' : 'border-l'
      } ${position}-0`}
      style={{ width: width || '350px' }}
    >
      {children}
    </aside>
  );
}
