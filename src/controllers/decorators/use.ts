import 'reflect-metadata';
import { RequestHandler } from 'express';

import { MetadataKeyEnums } from './MetadataKeyEnums';

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKeyEnums.Middleware, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeyEnums.Middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
