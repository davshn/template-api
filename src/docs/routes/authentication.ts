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
 *          $ref: "#/components/responses/426"
 */

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
 *          $ref: "#/components/responses/426"
 */

/**
 * Post track
 * @openapi
 * /authentication/adminLogin:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: "Admin login"
 *      description: Login admin
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
 *          $ref: "#/components/responses/426"
 */

/**
 * Post track
 * @openapi
 * /authentication/refresh:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: "User refresh token"
 *      description: Refresh token user
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              name: refreshToken
 *              schema:
 *                $ref: "#/components/schemas/userRefresh"
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 *        '426':
 *          $ref: "#/components/responses/426"
 */

/**
 * Post track
 * @openapi
 * /authentication/logout:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: "User logout"
 *      description: Logout user
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
 *                $ref: "#/components/schemas/userLogout"
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
 *        '426':
 *          $ref: "#/components/responses/426"
 */

/**
 * Post track
 * @openapi
 * /authentication/verify/{verifyToken}/{email}:
 *    get:
 *      tags:
 *        - Authentication
 *      summary: "User verify"
 *      description: Verify user
 *      parameters:
 *       - in: path
 *         name: verifyToken
 *         schema:
 *         type: string
 *         required: true
 *       - in: path
 *         name: email
 *         schema:
 *         type: string
 *         required: true
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
