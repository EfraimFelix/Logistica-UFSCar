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
 *     tags: [Pedido]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dados dos pedidos do usuário
 *       401:
 *         description: Não autorizado! Token JWT inválido ou ausente
 */

/**
 * @swagger
 * /pedido/{id}/historico:
 *   get:
 *     summary: Retorna o histórico completo de um pedido específico
 *     tags: [Pedido]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Histórico do pedido         
 *       401:
 *         description: Não autorizado! Token JWT inválido ou ausente
 *       403:
 *         description: Acesso negado. Apenas usuários logados podem ver histórico
 *       500:
 *         description: Erro interno do servidor
 */
