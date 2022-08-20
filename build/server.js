"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errors_1 = require("./middlewares/errors");
const cors_2 = __importDefault(require("./middlewares/cors"));
const routes_1 = __importDefault(require("./routes"));
const server = (0, express_1.default)();
// Middlewares
server.use((0, cors_1.default)(cors_2.default));
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(express_1.default.json({ limit: '50mb' }));
// Routes
server.use('/', routes_1.default);
// Error handlers.
server.use(errors_1.error404);
server.use(errors_1.generalErrorHandler);
exports.default = server;
