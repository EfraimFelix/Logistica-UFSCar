const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middlewares/auth');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Campus');
        res.json(result.rows);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { nome, latitude, longitude } = req.body;

    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem adicionar campus.' });
        }

        const query = 'INSERT INTO Campus (nome, latitude, longitude) VALUES ($1, $2, $3)';
        await pool.query(query, [nome, latitude, longitude]);
        res.status(201).json({ message: 'Campus adicionado com sucesso!' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
