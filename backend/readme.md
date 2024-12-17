# Logística UFSCar API

## Descrição
Este projeto é um sistema backend para gestão de entregas entre campus da Universidade Federal de São Carlos (UFSCar). Ele inclui funcionalidades para gerenciamento de campus, usuários, pedidos, produtos, histórico de entregas e status de pedidos.

## Tecnologias Utilizadas
- **Node.js**: Plataforma para execução do servidor.
- **Express.js**: Framework para criação de APIs.
- **PostgreSQL**: Banco de dados utilizado para armazenamento.
- **Swagger**: Ferramenta para documentação e exploração das APIs.
- **bcrypt**: Para hashing das senhas.
- **JWT (JSON Web Token)**: Para autenticação e autorização.

## Funcionalidades
1. **Campus**
   - Listar todos os campus.

2. **Usuários**
   - Cadastro de usuários.
   - Sistema de login com hash de senha (bcrypt).
   - Geração de token JWT para autenticação.

3. **Pedidos**
   - Gerenciar pedidos (listar, criar, atualizar, deletar).
   - Associar pedidos a usuários e campus de origem/destino.

4. **Produtos**
   - Gerenciar produtos associados a pedidos.

5. **Histórico de Entregas**
   - Rastreamento de pedidos por localização e status.

6. **Status**
   - Gerenciar os diferentes status dos pedidos (Criado, Em Trânsito, Entregue, etc.).

## Como Executar o Projeto

### 1. Requisitos
- Node.js instalado (v16 ou superior).
- PostgreSQL configurado.

### 2. Configuração do Banco de Dados

1. Crie o banco de dados e execute o script SQL disponível em `schema.sql` para configurar as tabelas e inserir dados iniciais.

2. Atualize as credenciais do banco de dados no arquivo `.env`:
   ```env
    DB_USER=USERNAME
    DB_HOST=HOSTNAME
    DB_NAME=DATABASE
    DB_PASS=PASSWORD
    DB_PORT=5432
    JWT_SECRET=TOKEN
   ```

### 3. Instalar Dependências

No diretório do projeto, execute:
```bash
npm install
```

### 4. Iniciar o Servidor

Execute o comando:
```bash
npm start
```
O servidor estará rodando em [http://localhost:3000](http://localhost:3000).

### 5. Documentação da API

Acesse a documentação Swagger em:
```
http://localhost:3000/api-docs
```

## Rotas Disponíveis

### Campus
- **GET /campus**: Lista todos os campus.

### Usuário
- **POST /usuario/login**: Realiza login e retorna um token JWT.
  - Parâmetros:
    - `email` (string): Email do usuário.
    - `senha` (string): Senha do usuário.

### Pedido
- **GET /pedido**: Lista todos os pedidos.

### Produto
- **GET /produto**: Lista todos os produtos.

### Histórico
- **GET /historico**: Lista todo o histórico de entregas.

### Status
- **GET /status**: Lista todos os status disponíveis.

## Estrutura do Projeto
```
├── server.js         # Arquivo principal para iniciar o servidor.
├── routes/           # Contém as rotas da aplicação.
├── controllers/      # Lógica para manipulação das rotas.
├── models/           # Modelos para interação com o banco de dados.
├── swagger.json      # Documentação Swagger das APIs.
├── schema.sql        # Script SQL para criação das tabelas.
└── .env              # Configuração do ambiente.
```

## Melhorias Futuras
- Adicionar paginação nas listagens.
- Implementar testes automatizados (Jest).
- Adicionar logs detalhados para depuração.
- Suporte a internacionalização (i18n).

---

Desenvolvido para fins acadêmicos.

