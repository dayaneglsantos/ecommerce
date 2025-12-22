interface BreadcrumbsProps {
  list: { label: string; href?: string }[];
}

export default function Breadcrumbs({ list }: BreadcrumbsProps) {
  return (
    <div>
      {list.map((item, index) => (
        <span key={index}>{item.label}</span>
      ))}
    </div>
  );
}
