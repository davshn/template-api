"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const { TOKEN_KEY } = process.env;
const registerController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    yield models_1.models.User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        documentNumber: req.body.documentNumber,
        documentType: req.body.documentType,
        email: req.body.email,
        password: yield bcrypt_1.default.hash(req.body.password, salt),
        phone: req.body.phone
    });
});
exports.registerController = registerController;
const loginController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const deviceInfo = req.body.deviceInfo;
    const user = yield models_1.models.User.findOne({ where: { email } });
    const isAuthenticated = yield bcrypt_1.default.compare(password, user.password);
    if (user !== null && isAuthenticated) {
        const isBanned = user.isBanned;
        const isVerified = user.isVerified;
        if (!isVerified)
            throw new Error('Usuario no verificado');
        else if (isBanned)
            throw new Error('Usuario baneado');
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email
            }, TOKEN_KEY, {
                expiresIn: '1h'
            });
            yield user.set({ deviceInfo: yield bcrypt_1.default.hash(deviceInfo, salt) });
            yield user.save();
            const loggedUser = {
                token: token
            };
            return loggedUser;
        }
    }
    else
        throw new Error('Datos incorrectos');
});
exports.loginController = loginController;
