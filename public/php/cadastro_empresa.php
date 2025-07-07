<?php
session_start();
include_once 'db_connection.php';

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $requiredFields = ['razao', 'nome', 'cnpj', 'celular', 'email', 'senha', 'pais', 'estado', 'cidade', 'rua', 'numero'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            echo json_encode(["success" => false, "message" => "Por favor, preencha todos os campos."]);
            exit();
        }
    }

    $razaoSocial = $_POST['razao'];
    $nomeFantasia = $_POST['nome'];
    $cnpj = $_POST['cnpj'];
    $celular = $_POST['celular'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $pais = $_POST['pais'];
    $estado = $_POST['estado'];
    $cidade = $_POST['cidade'];
    $rua = $_POST['rua'];
    $numero = $_POST['numero'];

    if (!$conn) {
        echo json_encode(["success" => false, "message" => "Erro de conexão com o banco de dados."]);
        exit();
    }

    $conn->begin_transaction();

    try {
        $sql_usuario = "INSERT INTO usuarios (email, senha, tipo) VALUES (?, ?, 'empresa')";
        $stmt_usuario = $conn->prepare($sql_usuario);
        if (!$stmt_usuario) {
            throw new Exception("Erro ao preparar consulta SQL para usuários: " . $conn->error);
        }
        $stmt_usuario->bind_param("ss", $email, $senha);
        if (!$stmt_usuario->execute()) {
            throw new Exception("Erro ao cadastrar o usuário: " . $stmt_usuario->error);
        }

        $usuario_id = $stmt_usuario->insert_id;

        $sql_empresa = "INSERT INTO empresas (usuario_id, razao_social, nome_fantasia, cnpj, celular, pais, estado, cidade, rua, numero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt_empresa = $conn->prepare($sql_empresa);
        if (!$stmt_empresa) {
            throw new Exception("Erro ao preparar consulta SQL para empresas: " . $conn->error);
        }
        $stmt_empresa->bind_param("isssssssss", $usuario_id, $razaoSocial, $nomeFantasia, $cnpj, $celular, $pais, $estado, $cidade, $rua, $numero);
        if (!$stmt_empresa->execute()) {
            throw new Exception("Erro ao cadastrar a empresa: " . $stmt_empresa->error);
        }

        $conn->commit();
        echo json_encode(["success" => true, "message" => "Cadastro realizado com sucesso!"]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }

    $stmt_usuario->close();
    $stmt_empresa->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Método não permitido."]);
}
?>