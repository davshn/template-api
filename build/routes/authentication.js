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
const authentication_1 = require("../middlewares/validations/authentication");
const authentication_2 = require("../controllers/authentication");
const rateLimiter_1 = require("../config/rateLimiter");
const winston_1 = __importDefault(require("../config/logger/winston"));
const router = (0, express_1.Router)();
router.post('/register', authentication_1.validateRegister, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Post track
     * @openapi
     * /authentication/register:
     *    post:
     *      tags:
     *        - Authentication
     *      summary: "User register"
     *      description: Register a new user
     *      parameters:
     *       - in: header
     *         name: Version
     *         schema:
     *         type: string
     *         required: true
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/newUser"
     *      responses:
     *        '201':
     *          $ref: "#/components/responses/200"
     *        '400':
     *          $ref: "#/components/responses/400"
     *        '422':
     *          $ref: "#/components/responses/422"
     *        '426':
     *          description: Upgrade Required.
     */
    try {
        yield (0, authentication_2.registerController)(req);
        res.status(201).send('Usuario registrado con exito');
    }
    catch (error) {
        winston_1.default.error(error);
        res.status(400).send('Usuario ya registrado');
    }
}));
router.post('/login', rateLimiter_1.bruteLimiter, authentication_1.validateLogin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Post track
     * @openapi
     * /authentication/login:
     *    post:
     *      tags:
     *        - Authentication
     *      summary: "User login"
     *      description: Login user
     *      parameters:
     *       - in: header
     *         name: Version
     *         schema:
     *         type: string
     *         required: true
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/userLogin"
     *      responses:
     *        '200':
     *          $ref: "#/components/responses/200"
     *        '400':
     *          $ref: "#/components/responses/400"
     *        '422':
     *          $ref: "#/components/responses/422"
     *        '426':
     *          description: Upgrade Required.
     */
    try {
        const loggedUser = yield (0, authentication_2.loginController)(req);
        res.status(200).json(loggedUser);
    }
    catch (error) {
        winston_1.default.error(error);
        res.status(400).json(error.message);
    }
}));
exports.default = router;
