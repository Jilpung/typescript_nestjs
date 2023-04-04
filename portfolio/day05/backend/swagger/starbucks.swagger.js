/**
 * @swagger
 * /users:
 *   get:
 *     summary: 스타벅스 리스트
 *     tags: [Starbucks]
 *     parameters:
 *          - in: query
 *            name: name
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
 *                            name:
 *                              type: string
 *                              example: 아메리카노
 *                            kcal:
 *                              type: number
 *                              example: 5
 *
 */
