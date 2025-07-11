import { FastifyPluginAsync } from 'fastify';

import { Offer, OfferItem, Quote } from '../models.js';

interface FetchParams {
  id: string;
}

// Weights for scoring algorithm
const DAILY_REVENUE = 500; // Amount of lost revenue applied as penalty per day of lead time
const STAR_WEIGHT = 400; // Weight of each point in a star rating

// Shorthand
const _Q = 'quotes';
const _R = 'ratings';

const quotes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const quotes = this.mongo.db?.collection(_Q);

    return await Array.fromAsync(quotes?.find({})?.sort({ 'offers.totalPrice': -1 }) ?? []);
  });

  fastify.get<{ Params: FetchParams }>('/:id', async function (request, reply) {
    const quotes = this.mongo.db?.collection(_Q);
    const { id } = request.params;

    const doc = await quotes?.findOne({ _id: id as any });
    if (!doc) reply.code(404);
    return doc;
  });

  fastify.get<{ Params: FetchParams }>('/:id/summary', async function (request, reply) {
    const quotes = this.mongo.db?.collection(_Q);
    const { id } = request.params;

    const doc = (await quotes?.findOne({ _id: id as any })) as unknown as Quote;
    const supplierQuotes: { [supplierId: string]: { [itemId: string]: OfferItem } } = {};
    for (const offer of doc.offers) {
      supplierQuotes[offer.supplierId] = offer.items.reduce(
        (acc: { [itemId: string]: OfferItem }, item: OfferItem) => {
          acc[item.itemId] = item;
          return acc;
        },
        {},
      );
    }

    return supplierQuotes;
  });

  fastify.get<{ Params: FetchParams }>('/:id/top', async function (request, reply) {
    const quotes = this.mongo.db?.collection(_Q);
    const ratings = this.mongo.db?.collection(_R);
    const { id } = request.params;

    const allRatings =
      (await ratings?.find({})?.toArray())?.reduce((acc: { [k: string]: number }, val) => {
        acc[val.supplierId] = val.rating;
        return acc;
      }, {}) ?? {};

    const score = (offer: Offer): number =>
      offer.shippingPrice +
      offer.totalPrice +
      DAILY_REVENUE * offer.leadTime +
      STAR_WEIGHT * allRatings[offer.supplierId];

    const doc = (await quotes?.findOne({ _id: id as any })) as unknown as Quote;
    const sorted = doc.offers.toSorted((a, b) => score(a) - score(b));

    console.log(sorted);
    return sorted[0];
  });
};

export const autoPrefix = '/quotes';

export default quotes;
