const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Adiciona o usuário ao objeto de requisição
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = authenticateToken;
