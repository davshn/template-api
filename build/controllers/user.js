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
exports.registerController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = __importDefault(require("../models"));
const registerController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    yield models_1.default.models.User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        documentNumber: req.body.documentNumber,
        documentType: req.body.documentType,
        email: req.body.email.toLowerCase(),
        password: yield bcrypt_1.default.hash(req.body.password, salt),
        phone: req.body.phone
    });
});
exports.registerController = registerController;
