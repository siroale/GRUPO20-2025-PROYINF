<?php
// Conectar a la base de datos
include "includes/dbinc.php";

// Obtener datos del formulario
$email = $_POST['email'];
$password = $_POST['password'];

// Verificar si el usuario existe
$query = $conn->prepare("SELECT * FROM usuario WHERE email = :email");
$query->bindParam(':email', $email);
$query->execute();

if ($query->rowCount() == 0) {
    echo "El correo no está registrado.";
    exit;
}

// Obtener el usuario
$user = $query->fetch(PDO::FETCH_ASSOC);

// Verificar la contraseña
if (password_verify($password, $user['password'])) {
    // Contraseña correcta, iniciar sesión
    session_start();

    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id_usuario'];
    $_SESSION['user_name'] = $user['nombre'];
    $_SESSION['user_type'] = $user['tipo_usuario'];
    
    echo "Inicio de sesión exitoso. Bienvenido, " . $user['nombre'] . "!";
    
    if ($user['tipo_usuario'] == 'normal'){
        header("Location: generar.php");    
    }
    if ($user['tipo_usuario'] == 'admin'){
        header("Location: creacion.php");    
    }
    exit;
} else {
    // Contraseña incorrecta
    echo "La contraseña es incorrecta.";
}
?>
