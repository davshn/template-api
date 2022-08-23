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
exports.refreshController = exports.loginController = exports.registerController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const models_1 = require("../models");
const signTokens_1 = require("../utils/signTokens");
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
    if (user === null)
        throw new Error('Usuario no encontrado');
    if (!(yield bcrypt_1.default.compare(password, user.password)))
        throw new Error('Datos incorrectos ');
    if (!(user.isVerified))
        throw new Error('Usuario no verificado ');
    if (user.isBanned)
        throw new Error('Usuario baneado ');
    const tokenId = (0, uuid_1.v4)();
    const authToken = (0, signTokens_1.signAuthToken)(user.id, user.email);
    const refToken = (0, signTokens_1.signRefreshToken)(tokenId, user.email);
    user.set({ deviceInfo: Object.assign(Object.assign({}, user.deviceInfo), { [deviceInfo]: tokenId }) });
    yield user.save();
    return {
        token: authToken,
        refreshToken: refToken
    };
});
exports.loginController = loginController;
const refreshController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const refreshId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const deviceInfo = req.body.deviceInfo;
    const user = yield models_1.models.User.findOne({ where: { email } });
    if (user === null)
        throw new Error('Usuario no encontrado');
    if (!(user.isVerified))
        throw new Error('Usuario no verificado ');
    if (user.isBanned)
        throw new Error('Usuario baneado ');
    if (((user.deviceInfo[deviceInfo])) !== refreshId) {
        user.set({ deviceInfo: {} });
        yield user.save();
        throw new Error('Refresh Token en desuso ');
    }
    const tokenId = (0, uuid_1.v4)();
    const authToken = (0, signTokens_1.signAuthToken)(user.id, user.email);
    const refToken = (0, signTokens_1.signRefreshToken)(tokenId, user.email);
    user.set({ deviceInfo: Object.assign(Object.assign({}, user.deviceInfo), { [deviceInfo]: tokenId }) });
    yield user.save();
    return {
        token: authToken,
        refreshToken: refToken
    };
});
exports.refreshController = refreshController;
