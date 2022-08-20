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
const express_1 = require("express");
const authentication_1 = require("../middlewares/validations/authentication");
const authentication_2 = require("../controllers/authentication");
const rateLimiter_1 = require("../middlewares/rateLimiter");
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
     *          description: User Created.
     *        '400':
     *          description: Bad request.
     *        '422':
     *          description: Validation Error.
     *        '426':
     *          description: Upgrade Required.
     */
    try {
        yield (0, authentication_2.registerController)(req);
        res.status(201).send('Usuario registrado con exito');
    }
    catch (error) {
        console.log(error);
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
     *          description: Login Success.
     *        '400':
     *          description: Bad request.
     *        '422':
     *          description: Validation Error.
     *        '426':
     *          description: Upgrade Required.
     */
    try {
        const loggedUser = yield (0, authentication_2.loginController)(req);
        res.status(200).json(loggedUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}));
exports.default = router;
