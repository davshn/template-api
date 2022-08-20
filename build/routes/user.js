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
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
   *        '422':
   *          description: Validation Error.
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
