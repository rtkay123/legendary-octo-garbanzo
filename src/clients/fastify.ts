/* eslint-disable @typescript-eslint/no-explicit-any */
import Fastify, { type FastifyInstance } from 'fastify';
import { fastifySwagger } from '@fastify/swagger';
import Routes from '../router';

const fastify = Fastify();

export default async function initializeFasityClient(): Promise<FastifyInstance> {
  fastify.register(fastifySwagger, {
    specification: {
      path: './build/swagger.yaml',
      postProcessor: function (swaggerObject) {
        return swaggerObject;
      },
      baseDir: '../../',
    },
    prefix: '/swagger',
  });

  fastify.register(Routes);
  await fastify.ready();
  fastify.swagger();
  return await fastify;
}

export async function destroyFasityClient(): Promise<void> {
  await fastify.close();
}
