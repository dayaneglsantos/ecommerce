export default interface CategoryType {
  id: number;
  name: string;
  slug: string;
  status: string;
  description: string;
  subCategories?: CategoryType[];
}
