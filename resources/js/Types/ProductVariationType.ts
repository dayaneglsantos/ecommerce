import ProductImagesType from './ProductImagesType';
import ProductType from './ProductType';
import SupplierType from './SupplierType';

export default interface ProductVariationType {
  id: number;
  product: ProductType;
  color: {
    id: number;
    value: string;
    hexCode: string | null;
  };
  images: ProductImagesType[];
  sizes: {
    id: number;
    sizeId: number;
    size: string;
    oldPrice: string | null;
    price: string;
    stockQuantity: number;
    pixDiscount: {
      type: string | null;
      value: string | null;
    };
    sku: string;
    supplier: SupplierType | null;
  }[];
}
