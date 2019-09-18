import 'reflect-metadata';
import { RequestHandler } from 'express';

import { MethodEnums } from './MethodEnums';
import { MetadataKeyEnums } from './MetadataKeyEnums';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeyEnums.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeyEnums.Method, method, target, key);
    };
  };
}

export const get = routeBinder(MethodEnums.Get);
export const post = routeBinder(MethodEnums.Post);
export const put = routeBinder(MethodEnums.Put);
export const del = routeBinder(MethodEnums.Del); // 'delete' is protected in JS
export const patch = routeBinder(MethodEnums.Patch);
