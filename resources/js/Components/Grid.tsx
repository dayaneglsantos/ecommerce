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
  return (
    <div
      className={`col-span-${smSize || size} sm:col-span-${
        mdSize || size
      } md:col-span-${size}`}
    >
      {children}
    </div>
  );
};

export { GridContainer, GridItem };
