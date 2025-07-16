import { FastifyPluginAsync } from 'fastify';

import { Item, Offer, OfferItem, Quote, Supplier } from '../models.js';

interface FetchParams {
  id: string;
}

// Weights for scoring algorithm
const DAILY_REVENUE = 500; // Amount of lost revenue applied as penalty per day of lead time
const STAR_WEIGHT = 400; // Weight of each point in a star rating

// Shorthand
const _Q = 'quotes';
const _R = 'ratings';
const _I = 'items';
const _S = 'suppliers';

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

  fastify.get<{ Params: FetchParams }>('/:id/aggregate', async function (request, reply) {
    const quotes = this.mongo.db?.collection(_Q);
    const ratings = this.mongo.db?.collection(_R);
    const items = this.mongo.db?.collection(_I);
    const suppliers = this.mongo.db?.collection(_S);
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

    const itemsBySupplier = await doc.offers.reduce(async (supplierAcc, offer) => {
      const supplier = (await suppliers?.findOne({
        _id: offer.supplierId as any,
      })) as unknown as Supplier;
      return {
        ...(await supplierAcc),
        [offer.supplierId]: {
          name: supplier?.name,
          country: supplier?.country,
          rating: allRatings[offer.supplierId],
          score: score(offer),
          ...(await offer.items.reduce(
            async (itemAcc, item) => ({ ...(await itemAcc), [item.itemId]: item }),
            Promise.resolve({}),
          )),
        },
      };
    }, Promise.resolve({}));

    return {
      suppliers: itemsBySupplier,
      items: await doc.offers.reduce(
        async (acc, offer) => {
          const res = { ...(await acc) };

          for (const item of offer.items) {
            if (Object.keys(res).includes(item.itemId)) {
              continue;
            }

            for (const [supplier, quote] of Object.entries(itemsBySupplier)) {
              res[item.itemId] = {
                ...res[item.itemId],
                name: ((await items?.findOne({ _id: item.itemId as any })) as unknown as Item).name,
                [supplier]: quote,
              };
            }
          }

          return res;
        },
        Promise.resolve({} as { [k: string]: any }),
      ),
    };
  });
};

export const autoPrefix = '/quotes';

export default quotes;
