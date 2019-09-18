"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MethodEnums_1 = require("./MethodEnums");
var MetadataKeyEnums_1 = require("./MetadataKeyEnums");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(MethodEnums_1.MethodEnums.Get);
exports.post = routeBinder(MethodEnums_1.MethodEnums.Post);
exports.put = routeBinder(MethodEnums_1.MethodEnums.Put);
exports.del = routeBinder(MethodEnums_1.MethodEnums.Del); // 'delete' is protected in JS
exports.patch = routeBinder(MethodEnums_1.MethodEnums.Patch);
