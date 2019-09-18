import { Request, Response, RequestHandler, NextFunction } from 'express';
import 'reflect-metadata';

import { AppRouter } from '../../AppRouter';
import { MethodEnums } from './MethodEnums';
import { MetadataKeyEnums } from './MetadataKeyEnums';

function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request - no body received.');
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Required body prop "${key}" was not provided`);
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string) {
  return function(target: Function) {
    for (let key in target.prototype) {
      const router = AppRouter.getInstance();

      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeyEnums.Path,
        target.prototype,
        key
      );

      const method: MethodEnums = Reflect.getMetadata(
        MetadataKeyEnums.Method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(
          MetadataKeyEnums.Middleware,
          target.prototype,
          key
        ) || [];

      const requireBodyProps =
        Reflect.getMetadata(
          MetadataKeyEnums.Validator,
          target.prototype,
          key
        ) || [];
      const validator = bodyValidators(requireBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
