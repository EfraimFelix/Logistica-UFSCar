const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Status');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
