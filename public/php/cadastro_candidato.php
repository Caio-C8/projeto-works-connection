<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once 'db_connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $requiredFields = ['nome', 'sobrenome', 'cpf', 'celular', 'email', 'senha', 'sexo', 'pais', 'estado'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            echo json_encode(["success" => false, "message" => "Por favor, preencha todos os campos."]);
            exit();
        }
    }

    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $cpf = $_POST['cpf'];
    $celular = $_POST['celular'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $sexo = $_POST['sexo'];
    $pais = $_POST['pais'];
    $estado = $_POST['estado'];

    $conn->begin_transaction();

    try {
        $sql_usuario = "INSERT INTO usuarios (email, senha, tipo) VALUES (?, ?, 'candidato')";
        $stmt_usuario = $conn->prepare($sql_usuario);
        $stmt_usuario->bind_param("ss", $email, $senha);
        if (!$stmt_usuario->execute()) {
            throw new Exception("Erro ao cadastrar o usuário: " . $stmt_usuario->error);
        }

        $usuario_id = $stmt_usuario->insert_id;

        $sql_candidato = "INSERT INTO candidatos (usuario_id, nome, sobrenome, cpf, celular, sexo, pais, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt_candidato = $conn->prepare($sql_candidato);
        $stmt_candidato->bind_param("isssssss", $usuario_id, $nome, $sobrenome, $cpf, $celular, $sexo, $pais, $estado);
        if (!$stmt_candidato->execute()) {
            throw new Exception("Erro ao cadastrar o candidato: " . $stmt_candidato->error);
        }

        $conn->commit();
        echo json_encode(["success" => true, "message" => "Cadastro realizado com sucesso!"]);
        exit();
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
        exit();
    }

    $stmt_usuario->close();
    $stmt_candidato->close();
    $conn->close();
}
?>