const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const campusRoutes = require('./routes/campus');
const usuarioRoutes = require('./routes/usuario');
const pedidoRoutes = require('./routes/pedido');
// const produtoRoutes = require('./routes/produto');
// const historicoRoutes = require('./routes/historico');
// const statusRoutes = require('./routes/status');

app.use('/campus', campusRoutes); 
app.use('/usuario', usuarioRoutes);
app.use('/pedido', pedidoRoutes); 
// app.use('/produto', produtoRoutes);
// app.use('/historico', historicoRoutes);   
// app.use('/status', statusRoutes); 

app.get('/', (req, res) => {
    res.send('Bem-vindo à API da UFSCar Delivery! Acesse /api-docs para ver a documentação.');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});
