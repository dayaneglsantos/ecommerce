import { AddressType } from './AddressType';

export default interface SupplierType {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  contactName: string;
  status: 'active' | 'inactive';
  notes: string | null;
  address: AddressType;
  createdAt: string;
  updatedAt: string;
}
