import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../middleware';
import {
  CreateInAndOutHandler,
  GetInAndOutByDateHandler,
  GetInAndOutListHandler,
  InputBalanceHandler,
} from './inAndOut.handlers';
import {
  CreateInAndOutSchema,
  GetInAndOutByDateSchema,
  GetInAndOutListSchema,
  InputBalanceSchema,
} from './inAndOut.schemas';

export const inAndOutRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.addHook('preHandler', authentication);
  route.get('/', {
    schema: GetInAndOutListSchema,
    handler: GetInAndOutListHandler,
  });
  route.get('/date', {
    schema: GetInAndOutByDateSchema,
    handler: GetInAndOutByDateHandler,
  });
  route.post('/', {
    schema: CreateInAndOutSchema,
    handler: CreateInAndOutHandler,
  });
  route.post('/balance', {
    schema: InputBalanceSchema,
    handler: InputBalanceHandler,
  });
};
