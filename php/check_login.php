<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['logado']) && $_SESSION['logado'] === true) {
    echo json_encode(["logged_in" => true]);
} else {
    echo json_encode(["logged_in" => false]);
}
?>