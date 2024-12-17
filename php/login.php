<?php
session_start();
include_once 'db_connection.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    if (empty($email) || empty($senha)) {
        echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
        exit();
    }

    $sql = "SELECT id, senha, tipo FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $senhaHash, $tipo);
        $stmt->fetch();

        if (password_verify($senha, $senhaHash)) {
            $_SESSION['usuario_id'] = $id;
            $_SESSION['email'] = $email;
            $_SESSION['tipo'] = $tipo;
            $_SESSION['logado'] = true;
            
            echo json_encode(["success" => true, "message" => "Login realizado com sucesso!"]);
        } else {
            echo json_encode(["success" => false, "message" => "E-mail ou senha incorretos."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "E-mail ou senha incorretos."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Método não permitido."]);
}
?>