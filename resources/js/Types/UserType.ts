import { AddressType } from './AddressType';

export interface UserType {
  id: number;
  name: string;
  email: string;
  cpf: string;
  email_verified_at: string | null;
  gender: 'F' | 'M';
  password: string;
  birthdate: string | null;
  phone_number: string;
  profile_image?: string | null;
  profile: string;
  remember_token: string | null;
  address: AddressType;
  created_at: string;
  updated_at: string;
}
