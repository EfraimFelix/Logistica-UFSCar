const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const authRoutes = require('../routes/usuario');
const authenticateToken = require('../middlewares/auth');
jest.mock('../db');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../middlewares/auth');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('POST /auth/register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
        const newUser = {
            email: 'testuser@example.com',
            senha: 'password123',
            nome: 'Test',
            sobrenome: 'User',
            is_admin: false,
        };

        bcrypt.hash.mockResolvedValue('hashedPassword');
        pool.query.mockResolvedValue({});

        const res = await request(app).post('/auth/register').send(newUser);
        expect(res.status).toBe(201);
        expect(res.text).toBe('Usuário cadastrado com sucesso!');
    });

    it('deve retornar 500 em caso de erro ao registrar usuário', async () => {
        const newUser = {
            email: 'testuser@example.com',
            senha: 'password123',
            nome: 'Test',
            sobrenome: 'User',
            is_admin: false,
        };

        bcrypt.hash.mockRejectedValue(new Error('Erro ao hashear a senha'));

        const res = await request(app).post('/auth/register').send(newUser);
        expect(res.status).toBe(500);
        expect(res.text).toBe('Erro ao hashear a senha');
    });
});

describe('POST /auth/login', () => {
    it('deve fazer login e retornar um token', async () => {
        const loginUser = { email: 'testuser@example.com', senha: 'password123' };
        const mockUser = { id: 1, email: 'testuser@example.com', senha: 'hashedPassword', is_admin: false };

        pool.query.mockResolvedValueOnce({ rows: [mockUser] });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockedToken');

        const res = await request(app).post('/auth/login').send(loginUser);
        expect(res.status).toBe(200);
        expect(res.body.token).toBe('mockedToken');
    });

    it('deve retornar 401 se as credenciais forem inválidas', async () => {
        const loginUser = { email: 'testuser@example.com', senha: 'password123' };
        pool.query.mockResolvedValueOnce({ rows: [] });

        const res = await request(app).post('/auth/login').send(loginUser);
        expect(res.status).toBe(401);
        expect(res.text).toBe('Credenciais inválidas');
    });

    it('deve retornar 500 se ocorrer erro ao logar', async () => {
        const loginUser = { email: 'testuser@example.com', senha: 'password123' };

        pool.query.mockRejectedValue(new Error('Erro ao consultar o banco'));

        const res = await request(app).post('/auth/login').send(loginUser);
        expect(res.status).toBe(500);
        expect(res.text).toBe('Erro ao consultar o banco');
    });
});

describe('GET /auth/', () => {
    it('deve retornar a lista de usuários para administradores', async () => {
        const mockUser = { id: 1, email: 'admin@example.com', is_admin: true };

        authenticateToken.mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        const mockUsers = [
            { id: 1, email: 'user1@example.com', nome: 'User1', sobrenome: 'Test1', is_admin: false },
            { id: 2, email: 'user2@example.com', nome: 'User2', sobrenome: 'Test2', is_admin: true },
        ];

        pool.query.mockResolvedValueOnce({ rows: mockUsers });

        const res = await request(app).get('/auth/');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockUsers);
    });

    it('deve retornar 403 se o usuário não for administrador', async () => {
        const mockUser = { id: 1, email: 'user@example.com', is_admin: false };

        authenticateToken.mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        const res = await request(app).get('/auth/');
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Acesso negado. Apenas administradores podem visualizar usuários.');
    });
});
