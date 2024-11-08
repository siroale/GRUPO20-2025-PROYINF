<?php
session_start();
// Conectar a la base de datos
include "includes/dbinc.php";

// Obtener datos del formulario
$email = $_POST['email'];
$password = $_POST['password'];
$nombre = $_POST['name'];
$tipo_usuario = 'normal';
$fecha_registro = date('Y-m-d H:i:s');
$confirm_password = $_POST['confirm_password'];


// Verificar si las contraseñas coinciden
if ($password !== $confirm_password) {
    $_SESSION['error_message'] = "Las contraseñas no coinciden.";
    exit;
}

// Validar si el correo ya está registrado
$query = $conn->prepare("SELECT * FROM usuario WHERE email = :email");
$query->bindParam(':email', $email);
$query->execute();

if ($query->rowCount() > 0) {
    $_SESSION['error_message'] = "Este correo ya está registrado. Intenta con otro.";
    exit;
}

// Encriptar la contraseña
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try{
    $sql = "INSERT INTO usuario (email, nombre, password, tipo_usuario, fecha_registro) 
                VALUES (:email, :nombre, :password, :tipo_usuario, :fecha_registro)";

    // Insertar nuevo usuario en la base de datos
    $insertQuery = $conn->prepare($sql);
    $insertQuery->bindParam(':email', $email);
    $insertQuery->bindParam(':nombre', $nombre);
    $insertQuery->bindParam(':password', $hashedPassword);
    $insertQuery->bindParam(':tipo_usuario', $tipo_usuario);
    $insertQuery->bindParam(':fecha_registro', $fecha_registro);

    if ($insertQuery->execute()) {
        //Registro exitoso.
        header("Location: landing.php");
    } else {
        $_SESSION['error_message'] = "Hubo un error al registrar el usuario.";
    }
    exit;
} catch (PDOException $e) {
    $_SESSION['error_message'] = $e->getMessage();
}
?>
