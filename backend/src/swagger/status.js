/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do status
 *         nome:
 *           type: string
 *           description: Status
 *         descricao:
 *           type: string
 *           description: Breve descrição do status
 */

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Retorna todos os possiveis status do pedido
 *     responses:
 *       200:
 *         description: Dados dos status
 */