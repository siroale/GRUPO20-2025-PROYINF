<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "boletinesDB";

try {
    // Crear conexión PDO
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    
    // Establecer el modo de error PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
