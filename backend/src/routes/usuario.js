const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();
const authenticateToken = require('../middlewares/auth');

router.get('/', authenticateToken, async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem visualizar usuários.' });
        }

        const result = await pool.query('SELECT id, email, nome, sobrenome, is_admin FROM Usuario');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/register', async (req, res) => {
    const { email, senha, nome, sobrenome, is_admin } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const query = 'INSERT INTO Usuario (email, senha, nome, sobrenome, is_admin) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(query, [email, hashedPassword, nome, sobrenome, is_admin]);
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const result = await pool.query('SELECT * FROM Usuario WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(401).send('Credenciais inválidas');

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) return res.status(401).send('Credenciais inválidas');

        const token = jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
