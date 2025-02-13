const request = require('supertest');
const express = require('express');
const pool = require('../db');
const statusRoutes = require('../routes/status');

const app = express();
app.use('/status', statusRoutes);

jest.mock('../db');

describe('GET /status', () => {
    it('deve retornar 200 e uma lista de status se a consulta for bem-sucedida', async () => {
        const mockResult = {
            rows: [
                { id: 1, nome: 'Em andamento', descricao: 'Pedido em progresso' },
                { id: 2, nome: 'Entregue', descricao: 'Pedido entregue' },
            ],
        };

        pool.query.mockResolvedValue(mockResult);

        const res = await request(app).get('/status');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResult.rows);
    });

    it('deve retornar 500 se ocorrer um erro na consulta ao banco de dados', async () => {
        pool.query.mockRejectedValue(new Error('Erro no banco de dados'));

        const res = await request(app).get('/status');
        expect(res.status).toBe(500);
    });
});
