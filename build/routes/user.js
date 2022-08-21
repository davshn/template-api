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
const express_1 = require("express");
const user_1 = require("../controllers/user");
const winston_1 = __importDefault(require("../config/logger/winston"));
const router = (0, express_1.Router)();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_1.infoController)(req);
        res.status(200).json(user);
    }
    catch (error) {
        winston_1.default.error(error);
        res.status(400).send('Error al obtener datos de usuario');
    }
}));
/**
 * Post track
 * @openapi
 * /user/:
 *    get:
 *      tags:
 *        - User
 *      summary: "User information"
 *      description: Get user information
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
exports.default = router;
