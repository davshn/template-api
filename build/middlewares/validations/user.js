"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("./validateResults"));
exports.validateRegister = [
    (0, express_validator_1.body)('name', 'Nombre incorrecto')
        .exists()
        .isString()
        .isLength({ min: 3, max: 12 }),
    (0, express_validator_1.body)('lastname', 'Apellido incorrecto')
        .exists()
        .isString()
        .isLength({ min: 3, max: 12 }),
    (0, express_validator_1.body)('documentNumber', 'Numero de documento incorrecto')
        .exists()
        .isInt(),
    (0, express_validator_1.body)('documentType', 'Tipo de documento incorrecto')
        .exists()
        .isIn(['CC', 'NI', 'CE']),
    (0, express_validator_1.body)('email', 'Email incorrecto')
        .exists()
        .isEmail(),
    (0, express_validator_1.body)('password', 'Contraseña incorrecta')
        .exists()
        .isString()
        .isStrongPassword(),
    (0, express_validator_1.body)('phone', 'Telefono incorrecto')
        .exists()
        .isInt(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
