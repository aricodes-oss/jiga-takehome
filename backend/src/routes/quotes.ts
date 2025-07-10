import { FastifyPluginAsync } from 'fastify';

interface FetchParams {
  id: string;
}

// Shorthand
const _Q = 'quotes';

const quotes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const quotes = this.mongo.db?.collection(_Q);

    return await Array.fromAsync(quotes?.find({}) ?? []);
  });

  fastify.get<{ Params: FetchParams }>('/:id', async function (request, reply) {
    const quotes = this.mongo.db?.collection(_Q);
    const { id } = request.params;

    const doc = await quotes?.findOne({ _id: id as any });

    if (!doc) {
      reply.code(404);
    }

    return doc;
  });
};

export const autoPrefix = '/quotes';

export default quotes;
