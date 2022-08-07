"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalErrorHandler = exports.error404 = void 0;
const error404 = (_req, res) => {
    res.status(404).send('La ruta no existe');
};
exports.error404 = error404;
const generalErrorHandler = (err, _req, res) => {
    var _a, _b;
    const status = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
    const message = (_b = err.message) !== null && _b !== void 0 ? _b : err;
    res.status(status).send(message);
};
exports.generalErrorHandler = generalErrorHandler;
