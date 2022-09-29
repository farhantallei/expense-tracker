import { Type } from '@sinclair/typebox';
import { UserModel } from '../../models';

export const VerifySchema = {
  body: Type.Object({ id: UserModel.validation.id }),
  response: { 200: Type.Object({ status: Type.Literal('ok') }) },
};

export type VerifyTSchema = typeof VerifySchema;

export const AuthSchema = {
  body: Type.Object({
    username: UserModel.validation.username,
    password: UserModel.validation.password,
  }),
  response: {
    200: Type.Object(UserModel.response),
  },
};

export type AuthTSchema = typeof AuthSchema;
