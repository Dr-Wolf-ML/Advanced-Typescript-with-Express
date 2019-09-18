"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeyEnums_1 = require("./MetadataKeyEnums");
function use(middleware) {
    return function (target, key, desc) {
        var middlewares = Reflect.getMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Middleware, target, key) || [];
        Reflect.defineMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Middleware, middlewares.concat([middleware]), target, key);
    };
}
exports.use = use;
