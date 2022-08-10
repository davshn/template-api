"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("./validateResults"));
exports.validateLogin = [
    (0, express_validator_1.body)('email', 'Se requiere un email valido')
        .exists()
        .isEmail(),
    (0, express_validator_1.body)('password', 'Contraseña no valida')
        .exists()
        .isString()
        .isStrongPassword(),
    (0, express_validator_1.body)('deviceInfo', 'La informacion del dispositivo es requerida')
        .exists()
        .isString()
        .isLength({ min: 5 }),
    (0, express_validator_1.header)('Version', 'La version de la aplicacion es requerida')
        .exists()
        .isString()
        .isLength({ min: 5 }),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
