import BrandType from './BrandType';
import CategoryType from './CategoryType';
import ProductVariationType from './ProductVariationType';

export default interface ProductType {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  brand: BrandType;
  category: CategoryType;
  defaultColor: { color: string; id: number } | null;
  variations: ProductVariationType[];
  technicalSpecifications: JSON | null;
}
