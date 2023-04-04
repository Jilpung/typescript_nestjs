/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 프로필
 *     tags: [Users]
 *     parameters:
 *          - in: query
 *            name: email
 *            type: string
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *            applicattion/json:
 *                schema:
 *                    type: array
 *                    items:
 *                        properties:
 *                            email:
 *                              type: email
 *                              example: aaa@gmail.com
 *                            name:
 *                              type: string
 *                              example: 철수
 *                            phone:
 *                              type: number
 *                              example: 010-1234-5678
 *                            personal:
 *                              type: number
 *                              example: 220110-2222222
 *
 */
