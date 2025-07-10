import { FastifyPluginAsync } from 'fastify';

interface FetchParams {
  id: string;
}

// Shorthand
const _I = 'items';

const items: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const items = this.mongo.db?.collection(_I);

    return await Array.fromAsync(items?.find({}) ?? []);
  });

  fastify.get<{ Params: FetchParams }>('/:id', async function (request, reply) {
    const items = this.mongo.db?.collection(_I);
    const { id } = request.params;

    const doc = await items?.findOne({ _id: id as any });

    if (!doc) {
      reply.code(404);
    }

    return doc;
  });
};

export const autoPrefix = '/items';

export default items;
