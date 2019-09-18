import 'reflect-metadata';

import { MetadataKeyEnums } from './MetadataKeyEnums';

export function bodyValidator(...keys: string[]) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeyEnums.Validator, keys, target, key);
  };
}
