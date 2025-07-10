import { FastifyPluginAsync } from 'fastify';

interface FetchParams {
  id: string;
}

// Shorthand
const _R = 'ratings';

const ratings: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const ratings = this.mongo.db?.collection(_R);

    return await Array.fromAsync(ratings?.find({}) ?? []);
  });

  fastify.get<{ Params: FetchParams }>('/:id', async function (request, reply) {
    const ratings = this.mongo.db?.collection(_R);
    const { id } = request.params;

    const doc = await ratings?.findOne({ _id: id as any });

    if (!doc) {
      reply.code(404);
    }

    return doc;
  });

  fastify.get<{ Params: FetchParams }>('/supplier/:id', async function (request, reply) {
    const ratings = this.mongo.db?.collection(_R);
    const { id } = request.params;

    const doc = await ratings?.findOne({ supplierId: id as any });

    if (!doc) {
      reply.code(404);
    }

    return doc;
  });
};

export const autoPrefix = '/ratings';

export default ratings;
