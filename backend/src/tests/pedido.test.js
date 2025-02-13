const request = require('supertest');
const express = require('express');
const pedidoRoutes = require('../routes/pedido');
const pool = require('../db');

jest.mock('../db');
jest.mock('../middlewares/auth', () => (req, res, next) => {
    req.user = { id: 1 };
    next();
});

const app = express();
app.use(express.json());
app.use('/pedidos', pedidoRoutes);

describe('GET /pedidos', () => {
    it('deve retornar os pedidos do usuário autenticado', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [
                {
                    pedido_id: 1,
                    id_usuario: 1,
                    campus_inicial: 'A',
                    campus_final: 'B',
                    previsao_entrega: '2025-02-15',
                    valor_total: 100.5,
                    historico_id: 10,
                    latitude: 12.34,
                    longitude: 56.78,
                    status_id: 2,
                    status_nome: 'Em trânsito',
                    status_descricao: 'Pedido está a caminho',
                    historico_data: '2025-02-12T10:00:00Z',
                },
            ],
        });

        const res = await request(app).get('/pedidos');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                id_usuario: 1,
                campus_inicial: 'A',
                campus_final: 'B',
                previsao_entrega: '2025-02-15',
                valor_total: 100.5,
                historico: [
                    {
                        id: 10,
                        latitude: 12.34,
                        longitude: 56.78,
                        status: {
                            id: 2,
                            nome: 'Em trânsito',
                            descricao: 'Pedido está a caminho',
                        },
                        data: '2025-02-12T10:00:00Z',
                    },
                ],
            },
        ]);
    });

    it('deve retornar 403 se o usuário não estiver autenticado', async () => {
        jest.resetModules();
        jest.doMock('../middlewares/auth', () => (req, res, next) => {
            req.user = null;
            next();
        });

        const appSemAuth = express();
        appSemAuth.use('/pedidos', pedidoRoutes);

        const res = await request(appSemAuth).get('/pedidos');

        expect(res.status).toBe(403);
        expect(res.body).toEqual({
            message: 'Acesso negado. Apenas usuarios logados podem ver pedidos.',
        });
    });

    it('deve retornar 500 em caso de erro interno', async () => {
        pool.query.mockRejectedValueOnce(new Error('Erro no banco de dados'));

        const res = await request(app).get('/pedidos');

        expect(res.status).toBe(500);
        expect(res.text).toBe('Erro no banco de dados');
    });
});
