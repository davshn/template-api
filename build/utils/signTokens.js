"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_KEY } = process.env;
const signAuthToken = (userId, userEmail) => {
    const token = jsonwebtoken_1.default.sign({
        id: userId,
        email: userEmail
    }, TOKEN_KEY, {
        expiresIn: '1h'
    });
    return token;
};
exports.signAuthToken = signAuthToken;
const signRefreshToken = (tokenId, userEmail) => {
    const token = jsonwebtoken_1.default.sign({
        id: tokenId,
        email: userEmail
    }, TOKEN_KEY, {
        expiresIn: '30d'
    });
    return token;
};
exports.signRefreshToken = signRefreshToken;
