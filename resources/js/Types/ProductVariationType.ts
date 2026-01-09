import ProductImagesType from './ProductImagesType';
import ProductType from './ProductType';
import SupplierType from './SupplierType';

export default interface ProductVariationType {
  id: number;
  product: ProductType;
  color: string;
  images: ProductImagesType[];
  sizes: {
    id: number;
    size: string;
    oldPrice: number | null;
    price: number;
    stockQuantity: number;
    pixDiscountType: string | null;
    pixDiscountValue: string | null;
    sku: string;
    supplier: SupplierType | null;
  }[];
}
