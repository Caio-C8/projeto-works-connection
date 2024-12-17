<?php
$host = "localhost";
$user = "CaioC8";
$password = "Senha1";
$dbname = "db_name";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>