"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = __importDefault(require("./winston"));
const stream = {
    write: (message) => winston_1.default.info(message)
};
const morganMiddleware = (0, morgan_1.default)('Request: :method  :url Response: :status :res[content-length] - :response-time ms', { stream });
exports.default = morganMiddleware;
