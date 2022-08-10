"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../docs/swagger"));
const user_1 = __importDefault(require("./user"));
const authentication_1 = __importDefault(require("./authentication"));
const router = (0, express_1.Router)({ strict: true });
router.use('/user', user_1.default);
router.use('/authentication', authentication_1.default);
// Documentation
router.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = router;
