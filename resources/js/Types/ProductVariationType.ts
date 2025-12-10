import ProductType from './ProductType';
import SupplierType from './SupplierType';

export default interface ProductVariationType {
  id: number;
  product: ProductType;
  color: string;
  color_code: string;
  size: string;
  old_price: number | null;
  price: number;
  stock_quantity: number;
  pix_discount_percent: number | null;
  sku: string;
  technical_specifications: JSON | null;
  supplier: SupplierType | null;
  created_at: string;
  updated_at: string;
}
