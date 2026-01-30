import { Link } from '@inertiajs/react';

interface PaginationProps {
  links: {
    label: string;
    page: number | null;
    url: string | null;
    active: boolean;
  }[];
}

export default function Pagination({ links }: PaginationProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      {links.map((link, index) => (
        <Link
          href={link.url ? link.url : '#'}
          className={
            link.active
              ? 'font-bold text-primary-dark text-md border border-primary p-0.5 px-2.5 rounded-full cursor-default'
              : index === 0 || index === links.length - 1
                ? `px-2 border border-primary ${link.url ? 'bg-orange-50 text-primary-dark hover:bg-orange-100 font-medium' : 'text-gray-400 cursor-default '}  rounded-md  `
                : 'text-primary-dark p-1 hover:font-bold hover:underline'
          }
          disabled={!link.url}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}
