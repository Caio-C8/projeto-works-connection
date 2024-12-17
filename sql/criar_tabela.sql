CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('candidato', 'empresa') NOT NULL
) ENGINE=InnoDB;

CREATE TABLE candidatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE vagas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(255),
    ocupacao VARCHAR(255),
    local_trabalho VARCHAR(255),
    modo_trabalho VARCHAR(255),
    salario VARCHAR(255),
    descricao TEXT,
    data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);