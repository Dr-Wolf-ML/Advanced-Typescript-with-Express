"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeyEnums_1 = require("./MetadataKeyEnums");
function bodyValidator() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeyEnums_1.MetadataKeyEnums.Validator, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
