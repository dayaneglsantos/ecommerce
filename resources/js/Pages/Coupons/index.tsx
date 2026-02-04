import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CpuponFormModal from './CouponForm';

export default function CouponsPage() {
  const [openCouponModal, setOpenCouponModal] = useState(false);
  return (
    <AuthenticatedLayout>
      <Head title="Entradas de Produtos" />

      <div className="mx-auto max-w-7xl space-y-6 px-3 sm:px-6 lg:px-8">
        <h3 className="font-bold text-lg text-primary-dark">Cupons</h3>

        <div>
          <PrimaryButton onClick={() => setOpenCouponModal(true)}>
            Novo Cupom
          </PrimaryButton>
        </div>
      </div>
      <CpuponFormModal
        open={openCouponModal}
        onClose={() => setOpenCouponModal(false)}
      />
    </AuthenticatedLayout>
  );
}
