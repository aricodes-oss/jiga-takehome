import { FastifyPluginAsync } from 'fastify';

interface FetchParams {
  id: string;
}

// Shorthand
const _S = 'suppliers';

const suppliers: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const suppliers = this.mongo.db?.collection(_S);

    return await Array.fromAsync(suppliers?.find({}) ?? []);
  });

  fastify.get<{ Params: FetchParams }>('/:id', async function (request, reply) {
    const suppliers = this.mongo.db?.collection(_S);
    const { id } = request.params;

    const doc = await suppliers?.findOne({ _id: id as any });

    if (!doc) {
      reply.code(404);
    }

    return doc;
  });
};

export const autoPrefix = '/suppliers';

export default suppliers;
