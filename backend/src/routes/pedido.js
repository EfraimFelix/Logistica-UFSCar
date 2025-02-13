const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middlewares/auth');

router.get('/', authenticateToken, async (req, res) => {
    try {

        if (!req.user) {
            return res.status(403).json({ message: 'Acesso negado. Apenas usuarios logados podem ver pedidos.' });
        }
        const query = `
            SELECT 
                p.id AS pedido_id,
                p.id_usuario,
                p.campus_inicial,
                p.campus_final,
                p.previsao_entrega,
                p.valor_total,
                ci.nome as campus_inicial_nome,
                cf.nome as campus_final_nome,
                h.latitude,
                h.longitude,
                s.id as status_id,
                s.nome as status_nome,
                s.descricao as status_descricao,
                h.data as historico_data
            FROM Pedido p
            LEFT JOIN campus ci ON p.campus_inicial = ci.id
            LEFT JOIN campus cf ON p.campus_final = cf.id
            LEFT JOIN (
                SELECT DISTINCT ON (id_pedido) 
                    id_pedido,
                    id,
                    latitude,
                    longitude,
                    status,
                    data
                FROM Historico
                ORDER BY id_pedido, data DESC
            ) h ON p.id = h.id_pedido
            LEFT JOIN Status s ON h.status = s.id
            WHERE p.id_usuario = ${req.user.id}
            ORDER BY p.id;
        `;

        const result = await pool.query(query);
        
        const pedidosMap = {};
        for (const row of result.rows) {
            pedidosMap[row.pedido_id] = {
                id: row.pedido_id,
                id_usuario: row.id_usuario,
                campus_inicial: row.campus_inicial,
                campus_inicial_nome: row.campus_inicial_nome,
                campus_final: row.campus_final,
                campus_final_nome: row.campus_final_nome,
                previsao_entrega: row.previsao_entrega,
                valor_total: row.valor_total,
                status_atual: {
                    id: row.status_id,
                    nome: row.status_nome,
                    descricao: row.status_descricao,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    data: row.historico_data
                }
            };
        }

        const pedidos = Object.values(pedidosMap);
        res.json(pedidos);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;