import { Link } from '@inertiajs/react';

interface PaginationProps {
  links: {
    label: string;
    page: number | null;
    url: string | null;
    active: boolean;
  }[];
  onNavigate: (url: string) => void;
}

export default function Pagination({ links, onNavigate }: PaginationProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      {links.map((link, index) => (
        <button
          type="button"
          key={index}
          disabled={!link.url}
          onClick={() => link.url && onNavigate(link.url)}
          className={
            link.active
              ? 'font-bold text-primary-dark text-md border border-primary p-0.5 px-2.5 rounded-full'
              : `text-primary-dark p-1  ${link.url && 'hover:underline hover:font-bold'}`
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}
