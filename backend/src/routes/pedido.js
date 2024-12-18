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
                h.id AS historico_id,
                h.latitude,
                h.longitude,
                h.status AS status_id,
                h.data AS historico_data,
                s.nome AS status_nome,
                s.descricao AS status_descricao
            FROM Pedido p
            LEFT JOIN Historico h ON p.id = h.id_pedido
            LEFT JOIN Status s ON h.status = s.id
            WHERE id_usuario = ${req.user.id}
            ORDER BY p.id, h.data;
        `;

        const result = await pool.query(query);
        
        const pedidosMap = {};
        for (const row of result.rows) {
            if (!pedidosMap[row.pedido_id]) {
                pedidosMap[row.pedido_id] = {
                    id: row.pedido_id,
                    id_usuario: row.id_usuario,
                    campus_inicial: row.campus_inicial,
                    campus_final: row.campus_final,
                    previsao_entrega: row.previsao_entrega,
                    valor_total: row.valor_total,
                    historico: [],
                };
            }

            if (row.historico_id) {
                pedidosMap[row.pedido_id].historico.push({
                    id: row.historico_id,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    status: {
                        id: row.status_id,
                        nome: row.status_nome,
                        descricao: row.status_descricao,
                    },
                    data: row.historico_data,
                });
            }
        }

        const pedidos = Object.values(pedidosMap);

        res.json(pedidos);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;