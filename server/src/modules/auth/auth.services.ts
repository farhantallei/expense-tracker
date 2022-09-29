import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';

export async function checkUser(
  reply: FastifyReply,
  { username }: { username: string }
) {
  return await commitToDB(
    prisma.user.count({ where: { username } }),
    reply
  ).then((val) => !!val);
}

export async function verifyUserId(
  reply: FastifyReply,
  { id }: { id: string }
) {
  return await commitToDB(prisma.user.count({ where: { id } }), reply).then(
    (val) => !!val
  );
}

export async function createUser(
  reply: FastifyReply,
  data: { username: string; passwordHash: string }
) {
  return await commitToDB(
    prisma.user.create({
      data,
      select: { id: true, username: true, balance: true, createdAt: true },
    }),
    reply
  );
}

export async function getUser(
  reply: FastifyReply,
  { username }: { username: string }
) {
  return await commitToDB(
    prisma.user.findUnique({ where: { username } }),
    reply
  );
}
