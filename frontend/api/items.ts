import { Item } from '@/types';

import client from './client';

const BASE = '/items';

export async function all(): Promise<Item[]> {
  return (await client.get(BASE)).data as Item[];
}

export async function get(id: string): Promise<Item> {
  return (await client.get(`${BASE}/${id}`)).data as Item;
}
