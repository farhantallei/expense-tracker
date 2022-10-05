import { RouteHandlerTypebox } from '../../types';
import { range } from '../../utils';
import {
  CreateInAndOutTSchema,
  GetInAndOutByDateTSchema,
  GetInAndOutListTSchema,
  InputBalanceTSchema,
} from './inAndOut.schemas';
import {
  checkBalance,
  createInAndOut,
  getBalances,
  getInAndOut,
  getInAndOutByDate,
  inputBalance,
  updateBalance,
} from './inAndOut.services';

export const GetInAndOutListHandler: RouteHandlerTypebox<
  GetInAndOutListTSchema
> = async (request, reply) => {
  const { totalDays, week, ...query } = request.query;

  const from = (week - 1) * 7 + 1;
  const to = (week - 1) * 7 + totalDays;

  const balances = await getBalances(reply, { ...query, from, to });
  const inAndOut = await getInAndOut(reply, { ...query, from, to });

  function sumTotal(number: number, type: 'expense' | 'income') {
    return inAndOut.reduce((currentTotal, item) => {
      if (item.date !== number) return currentTotal;
      if (item.type !== type) return currentTotal;
      if (item.amount == null) return currentTotal;
      return item.amount + currentTotal;
    }, 0);
  }

  return range(from, to).map((number) => ({
    date: number,
    balance: balances.find((balance) => balance.date === number)?.amount || 0,
    income: sumTotal(number, 'income'),
    expense: sumTotal(number, 'expense'),
  }));
};

export const GetInAndOutByDateHandler: RouteHandlerTypebox<
  GetInAndOutByDateTSchema
> = async (request, reply) => {
  const query = request.query;

  return (await getInAndOutByDate(reply, query)).map(
    ({ createdAt, ...inAndOut }) => ({
      ...inAndOut,
      createdAt: createdAt.getTime(),
    })
  );
};

export const CreateInAndOutHandler: RouteHandlerTypebox<
  CreateInAndOutTSchema
> = async (request, reply) => {
  const { userId } = request.query;
  const {
    parentId,
    name,
    type,
    amount,
    description = '',
    year,
    month,
    date,
  } = request.body;

  return await createInAndOut(reply, {
    userId,
    parentId,
    name,
    type,
    amount,
    description,
    year,
    month,
    date,
  }).then(({ createdAt, ...newInAndOut }) => ({
    ...newInAndOut,
    createdAt: createdAt.getTime(),
  }));
};

export const InputBalanceHandler: RouteHandlerTypebox<
  InputBalanceTSchema
> = async (request, reply) => {
  const { userId } = request.query;
  const { amount, ...body } = request.body;

  const isBalanceExists = await checkBalance(reply, { userId, ...body });

  if (isBalanceExists)
    return await updateBalance(reply, { userId, amount, ...body }).then(
      ({ createdAt, ...balance }) => ({
        ...balance,
        createdAt: createdAt.getTime(),
      })
    );

  return await inputBalance(reply, { userId, amount, ...body }).then(
    ({ createdAt, ...balance }) => ({
      ...balance,
      createdAt: createdAt.getTime(),
    })
  );
};
