"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("../logger/winston"));
const whitelist = ['https://adoptapi.herokuapp.com', 'http://localhost:4000'];
const corsConfig = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin) || origin === undefined) {
            callback(null, true);
        }
        else {
            winston_1.default.error('CORS incorrecto' + origin);
            // eslint-disable-next-line node/no-callback-literal
            callback('No permitido por CORS');
        }
    }
};
exports.default = corsConfig;
