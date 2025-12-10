import { AddressType } from './AddressType';

export default interface SupplierType {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  phone_number: string;
  contact_name: string;
  notes: string | null;
  address: AddressType;
  created_at: string;
  updated_at: string;
}
