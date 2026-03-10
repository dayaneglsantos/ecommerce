import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import ContentContainer from '@/Components/ContentContainer';
import { GridContainer, GridItem } from '@/Components/Grid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CouponType } from '@/Types/CouponType';
import { Head, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { use } from 'react';
import { Grid } from 'swiper/modules';

export default function CouponDetails() {
  const coupon = usePage().props.coupon as CouponType;
  return (
    <AuthenticatedLayout>
      <Head title="Detalhes do Cupom" />

      <ContentContainer maxWidth="max-w-lg">
        <Card className="w-full relative">
          <h3 className="text-center">{coupon.code}</h3>
          <div>
            <p className="text-center text-sm text-gray-500">
              {dayjs(coupon.startDate).format('DD/MM/YYYY')} a{' '}
              {dayjs(coupon.endDate).format('DD/MM/YYYY')}
            </p>
          </div>
          <Badge className="absolute top-1 ri">
            {coupon.type === 'product' ? 'Produto' : 'Frete'}
          </Badge>
          <GridContainer gap={1} className="mt-3">
            <GridItem size={6}>
              <p className="text-gray-500">Desconto</p>
              <p className="font-bold">
                {coupon.discount.type === 'percentage'
                  ? `${coupon.discount.value}%`
                  : `R$ ${coupon.discount.value}`}
              </p>
            </GridItem>
            {coupon.minimumOrderValue && (
              <GridItem size={6}>
                <p className="text-gray-500">Valor Mínimo</p>
                <p className="font-bold">R$ {coupon.minimumOrderValue}</p>
              </GridItem>
            )}
          </GridContainer>
          {coupon.description && (
            <div className="mt-2">
              <p className="font-bold">Descrição</p>
              <p>{coupon.description}</p>
            </div>
          )}

          <GridContainer gap={1} className="mt-3">
            <GridItem size={4}>
              <p className="text-gray-500">Total</p>
              <p className="font-bold">{coupon.availableQuantity}</p>
            </GridItem>
            <GridItem size={4}>
              <p className="text-gray-500">Utilizados</p>
              <p className="font-bold">
                {/* Mudar após ajustes na tabela de controle de uso */}
                $999$
              </p>
            </GridItem>
            <GridItem size={4}>
              <p className="text-gray-500">Disponíveis</p>
              <p className="font-bold">
                {/* Mudar após ajustes na tabela de controle de uso */}
                $999$
              </p>
            </GridItem>
            <GridItem size={12} className="mt-2 text-center">
              <p className="text-gray-400">
                Quantidade liberada por usuário: {coupon.availablePerUser}
              </p>
            </GridItem>
          </GridContainer>
        </Card>
      </ContentContainer>
    </AuthenticatedLayout>
  );
}
