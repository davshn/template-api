/**
 * Post track
 * @openapi
 * /root/changeRole:
 *    patch:
 *      tags:
 *        - Root
 *      summary: "Change user role"
 *      description: Change user role
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/changeRole"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '401':
 *          $ref: "#/components/responses/401"
 *        '403':
 *          $ref: "#/components/responses/403"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
