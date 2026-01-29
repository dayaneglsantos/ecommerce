import emptyBox from '@/assets/empty-box.png';

interface EmptyContentProps {
  title: string;
  description?: string;
}

export default function EmptyContent({
  title,
  description,
}: EmptyContentProps) {
  return (
    <div className="p-6 py-12 border border-dashed border-primary bg-orange-50 rounded-lg text-center">
      <img src={emptyBox} alt="Empty Box" className="mx-auto mb-6 w-24 h-24" />
      <p className="text-gray-700 font-medium text-lg">{title}</p>
      {description && (
        <p className="mt-4 text-gray-600 italic">{description}</p>
      )}
    </div>
  );
}
