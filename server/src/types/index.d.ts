import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type {
  ContextConfigDefault,
  FastifySchema,
  preHandlerAsyncHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteShorthandOptionsWithHandler,
} from 'fastify';
import type {
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify/types/route';

declare module 'fastify' {
  interface FastifyRequest {
    author: {
      id: string;
    };
  }
}

export type RouteShorthandOptionsWithHandlerTypebox<
  TSchema extends FastifySchema = FastifySchema
> = RouteShorthandOptionsWithHandler<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;

export type RouteHandlerTypebox<TSchema extends FastifySchema = FastifySchema> =
  RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RouteGenericInterface,
    ContextConfigDefault,
    TSchema,
    TypeBoxTypeProvider
  >;
