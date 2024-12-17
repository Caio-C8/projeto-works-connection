<?php
include_once 'db_connection.php';

if ($conn->ping()) {
    echo "Conexão bem-sucedida!";
} else {
    echo "Erro na conexão!";
}
?>