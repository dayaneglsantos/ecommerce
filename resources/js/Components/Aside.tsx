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
      className="h-screen mt-16 p-3 bg-orange-50 fixed right-0 top-0 overflow-y-auto transition-all"
      style={{ width: width || '350px' }}
    >
      {children}
    </aside>
  );
}
