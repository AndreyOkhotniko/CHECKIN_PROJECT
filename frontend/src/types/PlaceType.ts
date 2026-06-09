export interface Place {
  id: number;
  ownerId?: number;
  name: string;
  description: string;
  address: string;
  category_id: number;
  qr_code?: string;
  stamp_url?: string;
  is_active?: boolean;
}
