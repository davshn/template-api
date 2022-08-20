"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errors_1 = require("./middlewares/errors");
const rateLimiter_1 = require("./middlewares/rateLimiter");
const cors_2 = __importDefault(require("./middlewares/cors"));
const morgan_1 = __importDefault(require("./middlewares/logger/morgan"));
const routes_1 = __importDefault(require("./routes"));
const server = (0, express_1.default)();
// Middlewares
server.use((0, helmet_1.default)());
server.use(express_1.default.urlencoded({ extended: true, limit: '100kb' }));
server.use(express_1.default.json({ limit: '100kb' }));
server.use(morgan_1.default);
server.use(rateLimiter_1.rateLimiter);
server.use((0, cors_1.default)(cors_2.default));
// Routes
server.use('/', routes_1.default);
// Error handlers.
server.use(errors_1.error404);
server.use(errors_1.generalErrorHandler);
exports.default = server;
