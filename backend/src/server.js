const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Logistica UFSCar API",
            version: "1.0.0",
            description: "API para gerenciamento de dados de campus, usuários, pedidos, produtos e histórico de entregas na UFSCar"
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./swagger/*.js'],
};


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const usuarioRoutes = require('./routes/usuario');
const pedidoRoutes = require('./routes/pedido');
const statusRoutes = require('./routes/status');

app.use('/usuario', usuarioRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/status', statusRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo à API da Logística UFSCar! Acesse /api-docs para ver a documentação.');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});
