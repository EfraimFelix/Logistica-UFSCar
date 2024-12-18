/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do pedido
 *         id_usuario:
 *           type: string
 *           description: ID do usuário que requisitou o pedido
 *         campus_inicial:
 *           type: string
 *           description: Campus da faculdade de origem do pedido
 *         campus_final:
 *           type: string
 *           description: Campus da faculdade de destino do pedido
 *         previsao_entrega:
 *           type: date
 *           description: Indica qual a data prevista para entrega do pedido no campus de destino
 *         valor_total:
 *           type: decimal
 *           description: Valor cobrado do usuario para fazer a entrega do pedido
 */

/**
 * @swagger
 * /pedido:
 *   get:
 *     summary: Retorna os pedidos do usuário autenticado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dados dos pedidos do usuário
 *       401:
 *         description: Não autorizado! Token JWT inválido ou ausente
 */