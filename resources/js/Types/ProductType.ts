import BrandType from './BrandType';
import CategoryType from './CategoryType';
import ColorType from './ColorType';
import ProductVariationType from './ProductVariationType';

export default interface ProductType {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  brand: BrandType;
  category: CategoryType;
  defaultColor: ColorType | null;
  variations: ProductVariationType[];
  technicalSpecifications: JSON | null;
  images: { id: number; url: string }[];
}
