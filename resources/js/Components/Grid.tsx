// ============ GRID CONTAINER ============

interface GridContainerProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

const GridContainer = ({
  columns,
  gap,
  children,
  className,
}: GridContainerProps) => {
  return (
    <div className={`grid grid-cols-12 gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

// ============ GRID ITEM ============

interface GridItemProps {
  size: number;
  smSize?: number;
  mdSize?: number;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const colSpans = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

const mdColSpans = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
};

const lgColSpans = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
};

const GridItem = ({
  size,
  smSize,
  mdSize,
  children,
  className,
  ...props
}: GridItemProps) => {
  const smClass = smSize
    ? colSpans[smSize as keyof typeof colSpans]
    : 'col-span-12';
  const mdClass = mdSize
    ? mdColSpans[mdSize as keyof typeof mdColSpans]
    : mdColSpans[size as keyof typeof mdColSpans];
  const lgClass = lgColSpans[size as keyof typeof lgColSpans];

  return (
    <div className={`${smClass} ${mdClass} ${lgClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export { GridContainer, GridItem };
