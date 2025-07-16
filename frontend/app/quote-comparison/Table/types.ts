import { FilledSupplier } from '@/types';

export interface Suppliers {
  [supplierId: string]: FilledSupplier;
}

export interface Items {
  name: string;
  [itemId: string]: FilledSupplier;
}
