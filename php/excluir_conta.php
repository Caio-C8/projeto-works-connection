<?php
session_start();
include_once 'db_connection.php';

header('Content-Type: application/json');

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    echo json_encode(["success" => false, "message" => "Usuário não está logado."]);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];

try {
    $conn->begin_transaction();

    $sql = "DELETE FROM usuarios WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $usuario_id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $conn->commit();
        session_unset();
        session_destroy();
        echo json_encode(["success" => true, "message" => "Conta excluída com sucesso."]);
    } else {
        $conn->rollback();
        echo json_encode(["success" => false, "message" => "Erro ao excluir a conta."]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Erro ao excluir a conta."]);
}
?>