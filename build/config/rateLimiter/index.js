"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bruteLimiter = exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const winston_1 = __importDefault(require("../logger/winston"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        var _a;
        const ip = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : req.socket.remoteAddress;
        winston_1.default.error('Demasiadas solicitudes de ' + ip);
        res.status(429).send('Demasiadas solicitudes, intenta de nuevo mas tarde');
    }
});
exports.bruteLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 60 * 1000,
    max: 5,
    standardHeaders: false,
    legacyHeaders: false,
    handler: (req, res) => {
        var _a;
        const ip = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : req.socket.remoteAddress;
        winston_1.default.error('Demasiados intentos de login de ' + ip);
        res.status(429).send('Demasiados intentos');
    }
});
