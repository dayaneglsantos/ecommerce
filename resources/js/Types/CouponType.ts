export interface CouponType {
  id: number;
  code: string;
  type: 'shipping' | 'product';
  description: string;
  discount: {
    type: 'percentage' | 'fixed';
    value: string | null;
  };
  startDate: string | null;
  endDate: string | null;
  minimumOrderValue: string | null;
  availablePerUser: string | null;
  availableQuantity: string | null;
  created_at: string;
  updated_at: string;
}
