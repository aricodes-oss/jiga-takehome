import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import fastifyMongodb from '@fastify/mongodb';
// Load .env file
import 'dotenv/config';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const baseOpts: FastifyPluginOptions = { prefix: '/api' };

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // Place here your custom code!
  void fastify.register(fastifyMongodb, {
    forceClose: true,
    url: process.env.MONGODB_URL,
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: opts,
    forceESM: true,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts, ...baseOpts },
    forceESM: true,
  });
};

export default app;
export { app, options };
