"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalErrorHandler = exports.error404 = void 0;
const winston_1 = __importDefault(require("../../config/logger/winston"));
const error404 = (req, res) => {
    const url = req.originalUrl;
    winston_1.default.error('Ruta no existe ' + url);
    res.status(404).send('La ruta no existe');
};
exports.error404 = error404;
const generalErrorHandler = (err, _req, res) => {
    var _a, _b;
    const status = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
    const message = (_b = err.message) !== null && _b !== void 0 ? _b : err;
    winston_1.default.error('Error general ' + JSON.stringify(message));
    res.status(status).send(message);
};
exports.generalErrorHandler = generalErrorHandler;
