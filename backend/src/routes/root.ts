import { FastifyPluginAsync, type RouteHandlerMethod } from 'fastify';

// All the collections we're exposing to the frontend
// In a larger application these would all get their own controller
const collections = ['items', 'quotes', 'ratings', 'suppliers'];

// We're just exposing our data collections to the frontend from here, so all our handlers follow the same form
const makeHandler = (collection: string): RouteHandlerMethod =>
  async function (request, reply) {
    const coll = this.mongo.db?.collection(collection);

    return await Array.fromAsync(coll?.find() ?? []);
  };

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  for (const collection of collections) {
    fastify.get(`/${collection}`, makeHandler(collection));
  }
};

export default root;
