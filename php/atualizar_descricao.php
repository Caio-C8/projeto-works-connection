<?php
session_start();
include_once 'db_connection.php';

header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'], $_POST['descricao'])) {
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];
$descricao = $_POST['descricao'];
$tipo = $_SESSION['tipo'];

if ($tipo === 'candidato') {
    $sql = "UPDATE candidatos SET descricao = ? WHERE usuario_id = ?";
} else {
    $sql = "UPDATE empresas SET descricao = ? WHERE usuario_id = ?";
}

$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $descricao, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Descrição atualizada com sucesso."]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao atualizar a descrição."]);
}

$stmt->close();
$conn->close();