"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_KEY } = process.env;
const authenticateProtection = (req, res, next) => {
    const token = req.header('Autentication');
    if (token === null) {
        res.status(401).send('Se requiere ser un usuario autenticado');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('Usuario invalido');
    }
};
exports.default = authenticateProtection;
