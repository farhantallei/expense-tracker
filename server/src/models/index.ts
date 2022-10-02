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
    id: Type.RegEx(/^c[^\s-]{8,}$/),
    userId: Type.RegEx(/^c[^\s-]{8,}$/),
    amount: Type.Integer({ minimum: 0 }),
    date: Type.Optional(Type.String({ format: 'date' })),
  },
  response: {
    id: Type.String(),
    userId: Type.String(),
    amount: Type.Integer(),
    date: Type.Integer(),
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
    description: Type.String({ minLength: 1 }),
    date: Type.Integer({ minimum: 1, maximum: 31 }),
    month: Type.Integer({ minimum: 1, maximum: 12 }),
    year: Type.Integer({ minimum: 1970 }),
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
    date: Type.Integer(),
    month: Type.Integer(),
    year: Type.Integer(),
    createdAt: Type.Integer(),
  },
};
