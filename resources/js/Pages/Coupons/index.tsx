import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import Card from '@/Components/Card';
import Coupon from '@/Components/Coupon';

export default function CouponsPage() {
  const coupons = usePage().props.coupons;

  console.log(coupons);
  return (
    <AuthenticatedLayout>
      <Head title="Entradas de Produtos" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <h3 className="font-bold text-lg text-primary-dark">Cupons</h3>

        <div className="flex justify-end">
          <PrimaryButton onClick={() => router.visit(route('coupons.create'))}>
            Novo cupom
          </PrimaryButton>
        </div>

        <Card>
          <Coupon />
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
