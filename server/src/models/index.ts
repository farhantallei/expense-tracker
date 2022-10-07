import { Type } from '@sinclair/typebox';

export const UserModel = {
  validation: {
    id: Type.RegEx(/^c[^\s-]{8,}$/),
    username: Type.String({ minLength: 3 }),
    password: Type.String({ minLength: 3 }),
    createdAt: Type.String({ format: 'date-time' }),
  },
  response: {
    id: Type.String(),
    username: Type.String(),
    createdAt: Type.Integer(),
  },
};

export const BalanceModel = {
  validation: {
    userId: Type.RegEx(/^c[^\s-]{8,}$/),
    amount: Type.Integer({ minimum: 0 }),
    year: Type.Integer({ minimum: 1970 }),
    month: Type.Integer({ minimum: 1, maximum: 12 }),
    date: Type.Integer({ minimum: 1, maximum: 31 }),
  },
  response: {
    amount: Type.Integer(),
    year: Type.Integer(),
    month: Type.Integer(),
    date: Type.Integer(),
  },
};

export const MonthlyBalanceModel = {
  validation: {
    userId: Type.RegEx(/^c[^\s-]{8,}$/),
    amount: Type.Integer({ minimum: 0 }),
    year: Type.Integer({ minimum: 1970 }),
    month: Type.Integer({ minimum: 1, maximum: 12 }),
  },
  response: {
    amount: Type.Integer(),
    year: Type.Integer(),
    month: Type.Integer(),
  },
};

export const InAndOutModel = {
  validation: {
    id: Type.RegEx(/^c[^\s-]{8,}$/),
    userId: Type.RegEx(/^c[^\s-]{8,}$/),
    parentId: Type.Optional(Type.RegEx(/^c[^\s-]{8,}$/)),
    name: Type.String({ minLength: 1 }),
    type: Type.Union([Type.Literal('expense'), Type.Literal('income')]),
    amount: Type.Optional(Type.Integer({ minimum: 0 })),
    description: Type.String(),
    totalDays: Type.Integer({ minimum: 1, maximum: 7 }),
    year: Type.Integer({ minimum: 1970 }),
    month: Type.Integer({ minimum: 1, maximum: 12 }),
    week: Type.Integer({ minimum: 1, maximum: 5 }),
    date: Type.Integer({ minimum: 1, maximum: 31 }),
    createdAt: Type.Optional(Type.String({ format: 'time' })),
  },
  response: {
    id: Type.String(),
    userId: Type.String(),
    parentId: Type.Union([Type.String(), Type.Null()]),
    name: Type.String(),
    type: Type.String(),
    amount: Type.Union([Type.Integer(), Type.Null()]),
    description: Type.String(),
    year: Type.Integer(),
    month: Type.Integer(),
    date: Type.Integer(),
    createdAt: Type.Integer(),
  },
};
