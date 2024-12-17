<?php
session_start();
include_once 'db_connection.php';

header('Content-Type: application/json');

$usuario_id = $_SESSION['usuario_id'];
$email = $_SESSION['email'] ?? null;
$tipo = $_SESSION['tipo'];

if ($tipo === 'candidato') {
    $sql = "SELECT nome, sobrenome, cpf, celular, sexo, pais, estado, descricao FROM candidatos WHERE usuario_id = ?";
} else {
    $sql = "SELECT razao_social, nome_fantasia, cnpj, celular, pais, estado, cidade, rua, numero, descricao FROM empresas WHERE usuario_id = ?";
}

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$dados = $result->fetch_assoc();

$stmt->close();
$conn->close();

echo json_encode([
    "email" => $email,
    "tipo" => $tipo,
    "dados" => $dados
]);