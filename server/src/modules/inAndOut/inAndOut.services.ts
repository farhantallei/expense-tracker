import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';

export async function getBalances(
  reply: FastifyReply,
  {
    userId,
    year,
    month,
    from,
    to,
  }: {
    userId: string;
    year: number;
    month: number;
    from: number;
    to: number;
  }
) {
  return await commitToDB(
    prisma.balance.findMany({
      where: { userId, year, month, date: { gte: from, lte: to } },
    }),
    reply
  );
}

export async function getMonthlyBalance(
  reply: FastifyReply,
  userId_year_month: { userId: string; year: number; month: number }
) {
  return await commitToDB(
    prisma.monthlyBalance.findUnique({
      where: { userId_year_month },
      select: { amount: true },
    }),
    reply
  );
}

export async function getInAndOut(
  reply: FastifyReply,
  {
    userId,
    year,
    month,
    from,
    to,
  }: {
    userId: string;
    year: number;
    month: number;
    from: number;
    to: number;
  }
) {
  return await commitToDB(
    prisma.inAndOut.findMany({
      where: { userId, year, month, date: { gte: from, lte: to } },
    }),
    reply
  );
}

export async function getInAndOutByDate(
  reply: FastifyReply,
  {
    userId,
    year,
    month,
    date,
  }: { userId: string; year: number; month: number; date: number }
) {
  return await commitToDB(
    prisma.inAndOut.findMany({
      where: { userId, year, month, date },
    }),
    reply
  );
}

export async function createInAndOut(
  reply: FastifyReply,
  {
    userId,
    parentId,
    name,
    type,
    amount,
    description,
    year,
    month,
    date,
  }: {
    userId: string;
    parentId?: string;
    name: string;
    type: 'expense' | 'income';
    amount?: number;
    description: string;
    year: number;
    month: number;
    date: number;
  }
) {
  return await commitToDB(
    prisma.inAndOut.create({
      data: {
        userId,
        parentId,
        name,
        type,
        amount,
        description,
        year,
        month,
        date,
      },
    }),
    reply
  );
}

export async function deleteInAndOut(
  reply: FastifyReply,
  { id }: { id: string }
) {
  return await commitToDB(
    prisma.inAndOut.delete({ where: { id }, select: null }),
    reply
  );
}

export async function checkBalance(
  reply: FastifyReply,
  {
    userId,
    year,
    month,
    date,
  }: {
    userId: string;
    year: number;
    month: number;
    date: number;
  }
) {
  return await commitToDB(
    prisma.balance.count({ where: { userId, year, month, date } }),
    reply
  ).then((val) => !!val);
}

export async function checkMonthlyBalance(
  reply: FastifyReply,
  {
    userId,
    year,
    month,
  }: {
    userId: string;
    year: number;
    month: number;
  }
) {
  return await commitToDB(
    prisma.monthlyBalance.count({ where: { userId, year, month } }),
    reply
  ).then((val) => !!val);
}

export async function inputBalance(
  reply: FastifyReply,
  data: {
    userId: string;
    amount: number;
    year: number;
    month: number;
    date: number;
  }
) {
  return await commitToDB(prisma.balance.create({ data }), reply);
}

export async function inputMonthlyBalance(
  reply: FastifyReply,
  data: {
    userId: string;
    amount: number;
    year: number;
    month: number;
  }
) {
  return await commitToDB(prisma.monthlyBalance.create({ data }), reply);
}

export async function updateBalance(
  reply: FastifyReply,
  {
    userId,
    amount,
    year,
    month,
    date,
  }: {
    userId: string;
    amount: number;
    year: number;
    month: number;
    date: number;
  }
) {
  return await commitToDB(
    prisma.balance.update({
      where: { userId_year_month_date: { userId, year, month, date } },
      data: { userId, amount, year, month, date },
    }),
    reply
  );
}

export async function updateMonthlyBalance(
  reply: FastifyReply,
  {
    userId,
    amount,
    year,
    month,
  }: {
    userId: string;
    amount: number;
    year: number;
    month: number;
  }
) {
  return await commitToDB(
    prisma.monthlyBalance.update({
      where: { userId_year_month: { userId, year, month } },
      data: { userId, amount, year, month },
    }),
    reply
  );
}

export async function deleteBalance(
  reply: FastifyReply,
  userId_year_month_date: {
    userId: string;
    year: number;
    month: number;
    date: number;
  }
) {
  return await commitToDB(
    prisma.balance.delete({ where: { userId_year_month_date } }),
    reply
  );
}

export async function deleteMonthlyBalance(
  reply: FastifyReply,
  userId_year_month: {
    userId: string;
    year: number;
    month: number;
  }
) {
  return await commitToDB(
    prisma.monthlyBalance.delete({ where: { userId_year_month } }),
    reply
  );
}
