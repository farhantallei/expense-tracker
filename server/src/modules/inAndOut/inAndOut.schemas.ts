import { Type } from '@sinclair/typebox';
import {
  BalanceModel,
  InAndOutModel,
  MonthlyBalanceModel,
  UserModel,
} from '../../models';

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

export const DeleteInAndOutSchema = {
  params: Type.Object({ id: InAndOutModel.validation.id }),
};

export type DeleteInAndOutTSchema = typeof DeleteInAndOutSchema;

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

export const GetMonthlyBalanceSchema = {
  querystring: Type.Object({
    userId: UserModel.validation.id,
    year: MonthlyBalanceModel.validation.year,
    month: MonthlyBalanceModel.validation.month,
  }),
  response: {
    200: Type.Object({ amount: MonthlyBalanceModel.response.amount }),
  },
};

export type GetMonthlyBalanceTSchema = typeof GetMonthlyBalanceSchema;

export const InputMonthlyBalanceSchema = {
  querystring: Type.Object({ userId: UserModel.validation.id }),
  body: Type.Object({
    amount: MonthlyBalanceModel.validation.amount,
    year: MonthlyBalanceModel.validation.year,
    month: MonthlyBalanceModel.validation.month,
  }),
  response: {
    200: Type.Object(MonthlyBalanceModel.response),
  },
};

export type InputMonthlyBalanceTSchema = typeof InputMonthlyBalanceSchema;
