/**
 * Post track
 * @openapi
 * /administrator/banUser:
 *    patch:
 *      tags:
 *        - Administrator
 *      summary: "Ban / Unban user"
 *      description: Ban / Unban user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/banUser"
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

/**
 * Post track
 * @openapi
 * /administrator/listUsers:
 *    get:
 *      tags:
 *        - Administrator
 *      summary: "List users"
 *      description: List users
 *      parameters:
 *        - in: query
 *          name: size
 *          schema:
 *          type: number
 *          required: false
 *          description: Items per page
 *        - in: query
 *          name: page
 *          schema:
 *          type: number
 *          required: false
 *          description: Page number
 *        - in: query
 *          name: orderBy
 *          schema:
 *          type: string
 *          required: false
 *          description: Column name for order
 *        - in: query
 *          name: orderDirection
 *          schema:
 *          type: string
 *          required: false
 *          description: Order direction
 *        - in: query
 *          name: searchByName
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by name
 *        - in: query
 *          name: searchByLastname
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by lastname
 *        - in: query
 *          name: searchByRole
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by role
 *        - in: query
 *          name: searchByIsBanned
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by is banned
 *        - in: query
 *          name: searchByIsVerified
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by is verified
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
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

/**
 * Post track
 * @openapi
 * /administrator/userDetail:
 *    get:
 *      tags:
 *        - Administrator
 *      summary: "Detail of a user"
 *      description: Detail of a user
 *      parameters:
 *        - in: query
 *          name: searchById
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by id
 *        - in: query
 *          name: searchByDocumentNumber
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by document number
 *        - in: query
 *          name: searchByEmail
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by email
 *        - in: query
 *          name: searchByPhone
 *          schema:
 *          type: string
 *          required: false
 *          description: Search by phone

 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
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
