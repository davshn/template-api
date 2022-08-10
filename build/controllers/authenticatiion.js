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
exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const { TOKEN_KEY } = process.env;
const loginController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const deviceInfo = req.body.deviceInfo;
    const user = yield models_1.models.User.findOne({ where: { email } });
    if ((user !== null) && (yield bcrypt_1.default.compare(password, user.password))) {
        const salt = yield bcrypt_1.default.genSalt(10);
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            deviceInfo: yield bcrypt_1.default.hash(deviceInfo, salt)
        }, TOKEN_KEY, {
            expiresIn: '1h'
        });
        yield user.set({ deviceInfo: deviceInfo });
        yield user.save();
        const loggedUser = {
            token: token
        };
        return loggedUser;
    }
    else
        throw new Error('Datos incorrectos');
});
exports.loginController = loginController;
