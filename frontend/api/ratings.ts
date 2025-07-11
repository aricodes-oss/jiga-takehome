import { Rating } from '@/types';

import client from './client';

const BASE = '/ratings';

export async function all(): Promise<Rating[]> {
  return (await client.get(BASE)).data as Rating[];
}

export async function get(id: string): Promise<Rating> {
  return (await client.get(`${BASE}/${id}`)).data as Rating;
}

export async function forSupplier(supplierId: string): Promise<Rating> {
  return (await client.get(`${BASE}/supplier/${supplierId}`)).data as Rating;
}
