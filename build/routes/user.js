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
const user_2 = require("../middlewares/validations/user");
const verifyVersion_1 = __importDefault(require("../middlewares/authentication/verifyVersion"));
const verifyAuthentication_1 = __importDefault(require("../middlewares/authentication/verifyAuthentication"));
const router = (0, express_1.Router)();
router.post('/register', verifyVersion_1.default, user_2.validateRegister, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Post track
     * @openapi
     * /user/register:
     *    post:
     *      tags:
     *        - User
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
        yield (0, user_1.registerController)(req);
        res.status(201).send('Usuario registrado con exito');
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Usuario ya registrado');
    }
}));
router.get('/info', verifyAuthentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
   * Post track
   * @openapi
   * /user/info:
   *    get:
   *      tags:
   *        - User
   *      summary: "User information"
   *      description: Get user information
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: User information success.
   *        '400':
   *          description: Bad request.
   *        '401':
   *          description: Invalid user.
   */
    try {
        const user = yield (0, user_1.infoController)(req);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).send('Error al obtener datos de usuario');
    }
}));
exports.default = router;
