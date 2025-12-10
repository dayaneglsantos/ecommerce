import BrandType from './BrandType';
import CategoryType from './CategoryType';
import ProductVariationType from './ProductVariationType';

export default interface ProductType {
  id: number;
  name: string;
  slug: string;
  decsription: string;
  full_description: string;
  brand: BrandType;
  category: CategoryType;
  defaultVariation: ProductVariationType;
}
