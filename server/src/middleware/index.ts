import { Type } from '@sinclair/typebox';
import { FastifyReply } from 'fastify';
import { UserModel } from '../models';
import prisma from '../prisma';
import { RouteHandlerTypebox } from '../types';
import { commitToDB } from '../utils';

const AuthenticationSchema = {
  querystring: Type.Object({
    userId: UserModel.validation.id,
  }),
};

export const authentication: RouteHandlerTypebox<
  typeof AuthenticationSchema
> = async (request, reply) => {
  const { userId } = request.query;

  const isValidId = await verifyUserId(reply, { id: userId });
  if (!isValidId) return reply.forbidden('User id salah');
};

async function verifyUserId(reply: FastifyReply, { id }: { id: string }) {
  return await commitToDB(prisma.user.count({ where: { id } }), reply).then(
    (val) => !!val
  );
}
