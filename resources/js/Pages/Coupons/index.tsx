import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CouponFormModal from './CouponForm';
import Card from '@/Components/Card';
import Coupon from '@/Components/Coupon';

export default function CouponsPage() {
  const [openCouponModal, setOpenCouponModal] = useState(false);
  const coupons = usePage().props.coupons;

  console.log(coupons);
  return (
    <AuthenticatedLayout>
      <Head title="Entradas de Produtos" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <h3 className="font-bold text-lg text-primary-dark">Cupons</h3>

        <div className="flex justify-end">
          <PrimaryButton onClick={() => setOpenCouponModal(true)}>
            Novo Cupom
          </PrimaryButton>
        </div>

        <Card>
          <Coupon />
        </Card>
      </div>
      <CouponFormModal
        open={openCouponModal}
        onClose={() => setOpenCouponModal(false)}
      />
    </AuthenticatedLayout>
  );
}
