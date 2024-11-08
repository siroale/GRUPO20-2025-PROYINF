<?php
session_start();
require_once '../vendor/autoload.php'; // Asegúrate de haber instalado Google API Client con Composer
include "includes/dbinc.php"; // Conexión a la base de datos

// Configuración de Google OAuth
$clientID = '407971795267-kt0cto0j9g6mun81gukaui176aff1gnu.apps.googleusercontent.com';
$clientSecret = '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';
$redirectUri = 'http://127.0.0.1/php/login_google.php'; // Reemplaza con la URL de tu sitio

$client = new Google\Client();
$client->setClientId($clientID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectUri);
$client->addScope("email");
$client->addScope("profile");

// Verifica si ya tienes el código de autorización de Google
if (!isset($_GET['code'])) {
    $authUrl = $client->createAuthUrl(); // Crea la URL de autenticación de Google
    header('Location: ' . filter_var($authUrl, FILTER_SANITIZE_URL)); // Redirige al usuario para autenticar
    exit;
} else {
    // Intercambia el código de autenticación por un token de acceso
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    // Obtén el perfil del usuario
    $oauth2 = new Google\Service\Oauth2($client);
    $googleUser = $oauth2->userinfo->get();

    // Extrae los datos del perfil de usuario
    $email = $googleUser->email;
    $nombre = $googleUser->name;

    // Verifica si el usuario ya está registrado
    $query = $conn->prepare("SELECT * FROM usuario WHERE email = :email");
    $query->bindParam(':email', $email);
    $query->execute();

    if ($query->rowCount() > 0) {
        // Usuario ya registrado, iniciar sesión
        $_SESSION['user_email'] = $email;
        header("Location: visualizacion.php");
        exit;
    } else {
        // Usuario no registrado, inserta en la base de datos y luego inicia sesión
        $tipo_usuario = 'normal';
        $fecha_registro = date('Y-m-d H:i:s');
        $usuario_google = true;

        $sql = "INSERT INTO usuario (email, nombre, password, tipo_usuario, fecha_registro, usuario_google) 
                VALUES (:email, :nombre, NULL, :tipo_usuario, :fecha_registro, :usuario_google)";
        $insertQuery = $conn->prepare($sql);
        $insertQuery->bindParam(':email', $email);
        $insertQuery->bindParam(':nombre', $nombre);
        $insertQuery->bindParam(':tipo_usuario', $tipo_usuario);
        $insertQuery->bindParam(':fecha_registro', $fecha_registro);
        $insertQuery->bindParam(':usuario_google', $usuario_google, PDO::PARAM_BOOL);

        if ($insertQuery->execute()) {
            // Registro exitoso, iniciar sesión
            $user = $query->fetch(PDO::FETCH_ASSOC);
            $_SESSION['user_email'] = $email;
            $_SESSION['user_id'] = $user['id_usuario'];
            $_SESSION['user_name'] = $user['nombre'];
            $_SESSION['user_type'] = $user['tipo_usuario'];
            header("Location: visualizacion.php");
            exit;
        } else {
            echo "Hubo un error al registrar el usuario.";
        }
    }
}
?>
