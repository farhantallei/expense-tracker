import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { LoginHandler, RegisterHandler, VerifyHandler } from './auth.handlers';
import { AuthSchema, VerifySchema } from './auth.schemas';

export const authRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.post('/register', {
    schema: AuthSchema,
    handler: RegisterHandler,
  });
  route.post('/login', {
    schema: AuthSchema,
    handler: LoginHandler,
  });
  route.post('/verify', {
    schema: VerifySchema,
    handler: VerifyHandler,
  });
};
