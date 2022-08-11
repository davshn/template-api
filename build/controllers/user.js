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
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoController = void 0;
const models_1 = require("../models");
const infoController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userInfo = yield models_1.models.User.findOne({
        attributes: [
            'name',
            'lastname',
            'email',
            'documentType',
            'documentNumber',
            'phone',
            'givenInAdoption'
        ],
        where: { id: user.id }
    });
    return userInfo;
});
exports.infoController = infoController;
