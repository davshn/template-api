"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("../../config/logger/winston"));
const ips = ['181.56.225.34'];
const filterIps = (req, res, next) => {
    var _a;
    const ip = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : req.socket.remoteAddress;
    if (ips.includes(ip)) {
        winston_1.default.error('Acceso denegado ' + ip);
        res.status(403).send('Acceso denegado');
    }
    else {
        winston_1.default.info('Acceso concedido a ' + ip);
        next();
    }
};
exports.default = filterIps;
