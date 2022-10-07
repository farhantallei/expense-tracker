import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../middleware';
import {
  CreateInAndOutHandler,
  DeleteInAndOutHandler,
  GetInAndOutByDateHandler,
  GetInAndOutListHandler,
  GetMonthlyBalanceHandler,
  InputBalanceHandler,
  InputMonthlyBalanceHandler,
} from './inAndOut.handlers';
import {
  CreateInAndOutSchema,
  DeleteInAndOutSchema,
  GetInAndOutByDateSchema,
  GetInAndOutListSchema,
  GetMonthlyBalanceSchema,
  InputBalanceSchema,
  InputMonthlyBalanceSchema,
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
  route.get('/monthly-balance', {
    schema: GetMonthlyBalanceSchema,
    handler: GetMonthlyBalanceHandler,
  });
  route.post('/', {
    schema: CreateInAndOutSchema,
    handler: CreateInAndOutHandler,
  });
  route.post('/balance', {
    schema: InputBalanceSchema,
    handler: InputBalanceHandler,
  });
  route.post('/monthly-balance', {
    schema: InputMonthlyBalanceSchema,
    handler: InputMonthlyBalanceHandler,
  });
  route.delete('/:id', {
    schema: DeleteInAndOutSchema,
    handler: DeleteInAndOutHandler,
  });
};
