import fastifyCors from '@fastify/cors';
import fastifySensible from '@fastify/sensible';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { authRoutes } from './modules/auth/auth.routes';

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

export function addPlugins() {
  app.register(fastifyCors, {
    credentials: true,
    origin: 'http://localhost:2000',
  });
  app.register(fastifySensible);
}

export function addRoutes() {
  app.register(
    async (route) => {
      route.register(authRoutes, { prefix: 'auth' });
    },
    { prefix: 'api' }
  );
}

export default app;
