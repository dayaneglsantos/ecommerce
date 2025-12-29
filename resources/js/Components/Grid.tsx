// ============ GRID CONTAINER ============

interface GridContainerProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode;
}

const GridContainer = ({ columns, gap, children }: GridContainerProps) => {
  return <div className={`grid grid-cols-12 gap-${gap}`}>{children}</div>;
};

// ============ GRID ITEM ============

interface GridItemProps {
  size: number;
  smSize?: number;
  mdSize?: number;
  children: React.ReactNode;
}

const GridItem = ({ size, smSize, mdSize, children }: GridItemProps) => {
  const mdClass = mdSize ? `md:col-span-${mdSize}` : '';
  const smClass = smSize ? `col-span-${smSize}` : '';
  const lgClass = `lg:col-span-${size}`;

  return <div className={`${smClass} ${mdClass} ${lgClass}`}>{children}</div>;
};

export { GridContainer, GridItem };
