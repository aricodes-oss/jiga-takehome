import { Supplier } from '@/types';

import client from './client';

const BASE = '/suppliers';

export async function all(): Promise<Supplier[]> {
  return (await client.get(BASE)).data as Supplier[];
}

export async function get(id: string): Promise<Supplier> {
  return (await client.get(`${BASE}/${id}`)).data as Supplier;
}
