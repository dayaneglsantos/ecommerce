import ProductImagesType from './ProductImagesType';
import ProductType from './ProductType';
import SupplierType from './SupplierType';

export default interface ProductVariationType {
  id: number;
  product: ProductType;
  color: {
    id: number;
    value: string;
  };
  images: ProductImagesType[];
  sizes: {
    id: number;
    size: string;
    oldPrice: number | null;
    price: number;
    stockQuantity: number;
    pixDiscount: {
      type: string | null;
      value: string | null;
    };
    sku: string;
    supplier: SupplierType | null;
  }[];
}
