interface AsideProps {
  position?: 'left' | 'right';
  children: React.ReactNode;
}

export default function Aside({ position = 'right', children }: AsideProps) {
  return (
    <aside
      className={`fixed z-40 top-16 p-3 border-gray-100 shadow-lg bg-gray-100 w-[250px] h-svh ${
        position === 'left' ? 'border-r' : 'border-l'
      } ${position}-0`}
    >
      {children}
    </aside>
  );
}
