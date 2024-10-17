<?php
session_start(); // Asegúrate de que la sesión está iniciada
session_unset(); // Destruye todas las variables de sesión
session_destroy(); // Destruye la sesión
header("Location: ../landing.php"); // Redirige a la página de login
exit();
?>