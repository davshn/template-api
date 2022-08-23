"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefresh = exports.verifyAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const winston_1 = __importDefault(require("../../config/logger/winston"));
const { TOKEN_KEY } = process.env;
const verifyAuthentication = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.slice(7);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        winston_1.default.error('AuthToken no valido ' + error.message);
        res.status(401).send('Usuario no valido');
    }
};
exports.verifyAuthentication = verifyAuthentication;
const verifyRefresh = (req, res, next) => {
    const token = req.body.refreshToken;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        winston_1.default.error('RefreshToken no valido ' + error.message);
        res.status(401).send('Usuario no valido');
    }
};
exports.verifyRefresh = verifyRefresh;
