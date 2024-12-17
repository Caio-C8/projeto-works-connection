<?php
include_once 'db_connection.php';

header('Content-Type: application/json');

$sql = "SELECT nome_empresa, ocupacao, local_trabalho, modo_trabalho, salario, descricao, data_publicacao FROM vagas";
$result = $conn->query($sql);

$vagas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $vagas[] = $row;
    }
}

echo json_encode($vagas);

$conn->close();
?>