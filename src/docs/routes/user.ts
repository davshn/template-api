
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
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '422':
 *          $ref: "#/components/responses/422"
 */

/**
 * Post track
 * @openapi
 * /user/edit:
 *    put:
 *      tags:
 *        - User
 *      summary: "User edit"
 *      description: Change user information
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userEdit"
 *      security:
 *        - bearerAuth: []
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

/**
 * Post track
 * @openapi
 * /user/delete:
 *    delete:
 *      tags:
 *        - User
 *      summary: "User delete"
 *      description: Get user delete
 *      security:
 *        - bearerAuth: []
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
