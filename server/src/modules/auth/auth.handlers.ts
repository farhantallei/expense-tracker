import bcrypt from 'bcryptjs';
import { RouteHandlerTypebox } from '../../types';
import { AuthTSchema, VerifyTSchema } from './auth.schemas';
import { checkUser, createUser, getUser, verifyUserId } from './auth.services';

export const RegisterHandler: RouteHandlerTypebox<AuthTSchema> = async (
  request,
  reply
) => {
  const { username, password } = request.body;

  const isUserExists = await checkUser(reply, { username });
  if (isUserExists) return reply.badRequest('Username sudah dipakai');

  const passwordHash = await bcrypt.hash(password, 12);

  return await createUser(reply, { username, passwordHash }).then(
    ({ createdAt, ...user }) => ({
      ...user,
      createdAt: createdAt.getTime(),
    })
  );
};

export const LoginHandler: RouteHandlerTypebox<AuthTSchema> = async (
  request,
  reply
) => {
  const { username, password } = request.body;

  const user = await getUser(reply, { username });
  if (user == null) return reply.badRequest('Username tidak ada');

  const { passwordHash, createdAt, ...currentUser } = user;

  const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
  if (!isPasswordCorrect) return reply.badRequest('Password salah');

  return {
    ...currentUser,
    createdAt: createdAt.getTime(),
  };
};

export const VerifyHandler: RouteHandlerTypebox<VerifyTSchema> = async (
  request,
  reply
) => {
  const body = request.body;

  const isValidId = await verifyUserId(reply, body);
  if (!isValidId) return reply.forbidden('User id salah');

  return { status: 'ok' };
};
