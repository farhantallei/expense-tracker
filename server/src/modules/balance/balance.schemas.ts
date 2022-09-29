import { Type } from '@sinclair/typebox';
import { UserModel } from '../../models';

export const GetLogSchema = {
  querystring: Type.Object({ id: UserModel.validation.id }),
  response: {
    200: Type.Array(Type.Object({})),
  },
};

export type GetLogTSchema = typeof GetLogSchema;
