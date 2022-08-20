"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLogin = exports.validateToken = exports.validateVersion = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("./validateResults"));
exports.validateVersion = [
    (0, express_validator_1.header)('Version', 'La version de la aplicacion es requerida')
        .exists()
        .isString()
        .isLength({ min: 5 })
        .escape(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validateToken = [
    (0, express_validator_1.header)('Authorization', 'Token no valido')
        .exists()
        .isString()
        .isLength({ min: 10 })
        .escape(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validateLogin = [
    (0, express_validator_1.body)('email', 'Email no valido')
        .exists()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.body)('password', 'Contraseña no valida')
        .exists()
        .isString()
        .isStrongPassword()
        .escape(),
    (0, express_validator_1.body)('deviceInfo', 'La informacion del dispositivo es requerida')
        .exists()
        .isString()
        .isLength({ min: 5 })
        .escape(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validateRegister = [
    (0, express_validator_1.body)('name', 'Nombre no valido')
        .exists()
        .isString()
        .isLength({ min: 3, max: 12 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('lastname', 'Apellido no valido')
        .exists()
        .isString()
        .isLength({ min: 3, max: 12 })
        .trim()
        .escape(),
    (0, express_validator_1.body)('documentNumber', 'Numero de documento no valido')
        .exists()
        .isInt()
        .toInt(),
    (0, express_validator_1.body)('documentType', 'Tipo de documento no valido')
        .exists()
        .isIn(['CC', 'NI', 'CE']),
    (0, express_validator_1.body)('email', 'Email incorrecto')
        .exists()
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.body)('password', 'Contraseña no valida')
        .exists()
        .isString()
        .isStrongPassword()
        .escape(),
    (0, express_validator_1.body)('phone', 'Telefono no valido')
        .exists()
        .isInt(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
