"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutValidation = void 0;
var express_validator_1 = require("express-validator");
/**
 * validator schema for
 */
exports.LayoutValidation = express_validator_1.checkSchema({
    id: {
        notEmpty: true,
        isString: true
    }
});
