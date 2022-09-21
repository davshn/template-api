/**
 * Post track
 * @openapi
 * /category/create:
 *    post:
 *      tags:
 *        - Category
 *      summary: "Create category"
 *      description: Create category
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/newCategory"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
