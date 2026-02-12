export interface MetaType {
  current_page: number;
  last_page: number;
  per_page: number;
  links: {
    label: string;
    page: number | null;
    url: string | null;
    active: boolean;
  }[];
  total: number;
}
