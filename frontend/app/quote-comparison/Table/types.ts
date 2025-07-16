import { FilledSupplier } from '@/types';

export interface Suppliers {
  [supplierId: string]: FilledSupplier | string;
  name: string;
}

export interface Items {
  name: string;
  [itemId: string]: FilledSupplier | string;
}
