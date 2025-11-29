export interface AddressType {
  id: number;
  zip_code: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string | null;
}
