import { Offer, Quote, SupplierQuotes } from '@/types';

import client from './client';

const BASE = '/quotes';

export async function all(): Promise<Quote[]> {
  return (await client.get(BASE)).data as Quote[];
}

export async function get(id: string): Promise<Quote> {
  return (await client.get(`${BASE}/${id}`)).data as Quote;
}

export async function summarize(id: string): Promise<SupplierQuotes> {
  return (await client.get(`${BASE}/${id}/summary`)).data as SupplierQuotes;
}

export async function top(id: string): Promise<Offer> {
  return (await client.get(`${BASE}/${id}/top`)).data as Offer;
}
