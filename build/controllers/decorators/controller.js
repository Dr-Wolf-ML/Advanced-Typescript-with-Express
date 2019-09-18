"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeyEnums_1 = require("./MetadataKeyEnums");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid request - no body received.');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Required body prop \"" + key + "\" was not provided");
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        for (var key in target.prototype) {
            var router = AppRouter_1.AppRouter.getInstance();
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Middleware, target.prototype, key) || [];
            var requireBodyProps = Reflect.getMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Validator, target.prototype, key) || [];
            var validator = bodyValidators(requireBodyProps);
            if (path) {
                router[method].apply(router, ["" + routePrefix + path].concat(middlewares, [validator,
                    routeHandler]));
            }
        }
    };
}
exports.controller = controller;
