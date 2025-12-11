import ProductType from './ProductType';
import SupplierType from './SupplierType';

export default interface ProductVariationType {
  id: number;
  product: ProductType;
  color: string;
  colorCode: string;
  size: string;
  oldPrice: number | null;
  price: number;
  stockQuantity: number;
  pixDiscountPercent: number | null;
  sku: string;
  technicalSpecifications: JSON | null;
  supplier: SupplierType | null;
}
