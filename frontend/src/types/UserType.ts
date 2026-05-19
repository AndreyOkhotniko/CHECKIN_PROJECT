export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: 'subj' | 'obj' | null;
}
