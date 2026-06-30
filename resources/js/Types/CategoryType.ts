import SizeGroupType from './SizeGroupType';

export default interface CategoryType {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  description: string;
  subCategories?: CategoryType[];
  parent?: CategoryType | null;
  sizeGroupId: number | null;
  sizeGroup?: SizeGroupType | null;
}
