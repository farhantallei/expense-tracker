import { Type } from '@sinclair/typebox';
import { BalanceModel, InAndOutModel, UserModel } from '../../models';

export const GetInAndOutListSchema = {
  querystring: Type.Object({
    userId: UserModel.validation.id,
    totalDays: InAndOutModel.validation.totalDays,
    year: InAndOutModel.validation.year,
    month: InAndOutModel.validation.month,
    week: InAndOutModel.validation.week,
  }),
  response: {
    200: Type.Array(
      Type.Object({
        date: Type.Integer(),
        balance: Type.Integer(),
        income: Type.Integer(),
        expense: Type.Integer(),
      })
    ),
  },
};

export type GetInAndOutListTSchema = typeof GetInAndOutListSchema;

export const GetInAndOutByDateSchema = {
  querystring: Type.Object({
    userId: UserModel.validation.id,
    year: InAndOutModel.validation.year,
    month: InAndOutModel.validation.month,
    date: InAndOutModel.validation.date,
  }),
  response: { 200: Type.Array(Type.Object(InAndOutModel.response)) },
};

export type GetInAndOutByDateTSchema = typeof GetInAndOutByDateSchema;

export const CreateInAndOutSchema = {
  querystring: Type.Object({ userId: UserModel.validation.id }),
  body: Type.Object({
    parentId: InAndOutModel.validation.parentId,
    name: InAndOutModel.validation.name,
    type: InAndOutModel.validation.type,
    amount: InAndOutModel.validation.amount,
    description: InAndOutModel.validation.description,
    year: InAndOutModel.validation.year,
    month: InAndOutModel.validation.month,
    date: InAndOutModel.validation.date,
  }),
  response: { 200: Type.Object(InAndOutModel.response) },
};

export type CreateInAndOutTSchema = typeof CreateInAndOutSchema;

export const InputBalanceSchema = {
  querystring: Type.Object({ userId: UserModel.validation.id }),
  body: Type.Object({
    amount: BalanceModel.validation.amount,
    year: BalanceModel.validation.year,
    month: BalanceModel.validation.month,
    date: BalanceModel.validation.date,
  }),
  response: {
    200: Type.Object(BalanceModel.response),
  },
};

export type InputBalanceTSchema = typeof InputBalanceSchema;
