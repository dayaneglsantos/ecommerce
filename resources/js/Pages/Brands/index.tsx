import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BrandsPage() {
  return (
    <AuthenticatedLayout>
      <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
        Página de marcas
      </div>
    </AuthenticatedLayout>
  );
}
