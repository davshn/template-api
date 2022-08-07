"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const routes_1 = __importDefault(require("./routes"));
const server = (0, express_1.default)();
// Middlewares
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(express_1.default.json({ limit: '50mb' }));
server.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
server.use('/', routes_1.default);
exports.default = server;
