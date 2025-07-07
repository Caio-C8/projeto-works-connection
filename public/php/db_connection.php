<?php
$host = "db";
$user = "user";
$password = "password";
$dbname = "works_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
