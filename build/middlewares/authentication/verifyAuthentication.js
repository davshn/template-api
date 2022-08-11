"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_KEY } = process.env;
const verifyAuthentication = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.slice(7);
    try {
        if (token === null) {
            res.status(401).send('Se requiere ser un usuario autenticado');
        }
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('Usuario no valido');
    }
};
exports.default = verifyAuthentication;
