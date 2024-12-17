-- Cria a tabela Campus
CREATE TABLE Campus (
    id SERIAL PRIMARY KEY UNIQUE,
    nome VARCHAR(64) NOT NULL,
    latitude INTEGER,
    longitude INTEGER
);

-- Cria a tabela Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY UNIQUE,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(64) NOT NULL,
    sobrenome VARCHAR(64) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- Cria a tabela Pedido
CREATE TABLE Pedido (
    id VARCHAR(32) PRIMARY KEY UNIQUE,
    id_usuario INTEGER NOT NULL,
    campus_inicial INTEGER NOT NULL,
    campus_final INTEGER NOT NULL,
    previsao_entrega TIMESTAMP,
    valor_total INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id),
    FOREIGN KEY (campus_inicial) REFERENCES Campus(id),
    FOREIGN KEY (campus_final) REFERENCES Campus(id)
);

-- Cria a tabela Produto
CREATE TABLE Produto (
    id SERIAL PRIMARY KEY UNIQUE,
    id_pedido VARCHAR(32) NOT NULL,
    peso DECIMAL,
    tamanho VARCHAR(32),
    descricao VARCHAR(255),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id)
);

-- Cria a tabela Status
CREATE TABLE Status (
    id SERIAL PRIMARY KEY UNIQUE,
    nome VARCHAR(64),
    descricao VARCHAR(255)
);

-- Cria a tabela Historico
CREATE TABLE Historico (
    id SERIAL PRIMARY KEY UNIQUE,
    id_pedido VARCHAR(32) NOT NULL,
    latitude INTEGER,
    longitude INTEGER,
    status INTEGER NOT NULL,
    data TIMESTAMP,
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id),
    FOREIGN KEY (status) REFERENCES Status(id)
);

-- Inserindo valores para Campus
INSERT INTO Campus (nome, latitude, longitude) VALUES
('UFSCar - Sao Carlos', -22, -47),
('UFSCar - Sorocaba', -23, -47),
('UFSCar - Araras', -22, -47),
('UFSCar - Lagoa do Sino', -23, -48);

-- Inserindo valores para Usuario
INSERT INTO Usuario (email, senha, nome, sobrenome, is_admin) VALUES
('admin@ufscar.br', 'admin123', 'Administrador', 'Sistema', TRUE),
('joao.silva@ufscar.br', 'joao123', 'Joao', 'Silva', FALSE),
('maria.souza@ufscar.br', 'maria123', 'Maria', 'Souza', FALSE),
('pedro.oliveira@ufscar.br', 'pedro123', 'Pedro', 'Oliveira', FALSE);

-- Inserindo valores para Status
INSERT INTO Status (nome, descricao) VALUES
('Criado', 'Pedido criado no sistema'),
('Em Transito', 'Pedido em deslocamento entre campus'),
('Entregue', 'Pedido entregue ao destinatario'),
('Atrasado', 'Pedido atrasado na entrega');

-- Inserindo valores para Pedido
INSERT INTO Pedido (id, id_usuario, campus_inicial, campus_final, previsao_entrega, valor_total) VALUES
('PED001', 2, 1, 2, '2024-06-15 12:00:00', 150),
('PED002', 3, 2, 3, '2024-06-16 18:00:00', 200),
('PED003', 4, 3, 4, '2024-06-17 10:00:00', 250);

-- Inserindo valores para Produto
INSERT INTO Produto (id_pedido, peso, tamanho, descricao) VALUES
('PED001', 2.5, 'Medio', 'Livros de Engenharia'),
('PED002', 1.0, 'Pequeno', 'Documentos Importantes'),
('PED003', 5.0, 'Grande', 'Equipamentos de Laboratorio');

-- Inserindo valores para Historico
INSERT INTO Historico (id_pedido, latitude, longitude, status, data) VALUES
('PED001', -22, -47, 1, '2024-06-14 08:00:00'),
('PED001', -22, -47, 2, '2024-06-15 09:00:00'),
('PED002', -23, -47, 1, '2024-06-15 10:00:00'),
('PED002', -23, -47, 2, '2024-06-16 12:00:00'),
('PED003', -22, -47, 1, '2024-06-16 09:00:00'),
('PED003', -23, -48, 2, '2024-06-17 08:00:00');
