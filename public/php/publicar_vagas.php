<?php
include_once 'db_connection.php';

$input = json_decode(file_get_contents("php://input"), true);

$nome_empresa = $input['nome_empresa'];
$ocupacao = $input['ocupacao'];
$local_trabalho = $input['local_trabalho'];
$modo_trabalho = $input['modo_trabalho'];
$salario = $input['salario'];
$descricao = $input['descricao'];
$data_publicacao = $input['data_publicacao'];

$sql = "INSERT INTO vagas (nome_empresa, ocupacao, local_trabalho, modo_trabalho, salario, descricao, data_publicacao)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $nome_empresa, $ocupacao, $local_trabalho, $modo_trabalho, $salario, $descricao, $data_publicacao);

if ($stmt->execute()) {
    echo "Vaga publicada com sucesso!";
} else {
    echo "Erro ao publicar a vaga: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>