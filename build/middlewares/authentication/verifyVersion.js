"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("../../config/logger/winston"));
const versionProtection = (req, res, next) => {
    const { VERSION } = process.env;
    const version = req.header('Version');
    if (version !== VERSION) {
        winston_1.default.warn('Version de aplicacion incorrecta ' + version);
        res.status(426).send('La ultima version de la aplicacion es requerida');
    }
    else
        next();
};
exports.default = versionProtection;
