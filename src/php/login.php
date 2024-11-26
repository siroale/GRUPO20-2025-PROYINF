<?php
session_start();
session_regenerate_id();
// Conectar a la base de datos
include "includes/dbinc.php";

// Verificar si los datos fueron enviados
if (!isset($_POST['email']) || !isset($_POST['password'])) {
    $_SESSION['error_message'] = "Por favor, completa ambos campos.";
    header("Location: landing.php");
    exit;
}

// Obtener datos del formulario
$email = $_POST['email'];
$password = $_POST['password'];

// Verificar si el usuario existe
$query = $conn->prepare("SELECT * FROM usuario WHERE email = :email");
$query->bindParam(':email', $email);
$query->execute();

if ($query->rowCount() == 0) {
    // Si el correo no está registrado, almacenamos el mensaje en una variable de sesión y redirigimos
    $_SESSION['error_message'] = "El correo no está registrado.";
    header("Location: landing.php"); // Redirige a una página de login
    exit;
}

// Obtener el usuario
$user = $query->fetch(PDO::FETCH_ASSOC);

// Verificar la contraseña
if (password_verify($password, $user['password'])) {
    // Contraseña correcta, iniciar sesión
    $_SESSION['user_id'] = $user['id_usuario'];
    $_SESSION['user_name'] = $user['nombre'];
    $_SESSION['user_type'] = $user['tipo_usuario'];
    
    //echo "Inicio de sesión exitoso. Bienvenido, " . $user['nombre'] . "!";
    
    if ($user['tipo_usuario'] == 'normal'){
        header("Location: boletines.php");    
    }
    if ($user['tipo_usuario'] == 'admin'){
        header("Location: creacion.php");    
    }
    exit;
} else {
    // Contraseña incorrecta, redirigir con mensaje de error
    $_SESSION['error_message'] = "La contraseña es incorrecta.";
    header("Location: landing.php");
    exit;
}
?>
