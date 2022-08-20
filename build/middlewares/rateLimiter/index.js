"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bruteLimiter = exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Demasiadas solicitudes, intenta de nuevo mas tarde'
});
exports.bruteLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 60 * 1000,
    max: 5,
    standardHeaders: false,
    legacyHeaders: false,
    message: 'Demasiados intentos, intenta de nuevo mas tarde'
});
