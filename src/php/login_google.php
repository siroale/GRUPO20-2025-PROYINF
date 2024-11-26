<?php
include "includes/dbinc.php"; // Conexión a la base de datos
// Initialize the session
session_start();
// Update the following variables
$google_oauth_client_id = '407971795267-kt0cto0j9g6mun81gukaui176aff1gnu.apps.googleusercontent.com';
$google_oauth_client_secret = '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';
$google_oauth_redirect_uri = 'http://127.0.0.1/php/login_google.php';
$google_oauth_version = 'v3';
// If the captured code param exists and is valid
if (isset($_GET['code']) && !empty($_GET['code'])) {
    // Execute cURL request to retrieve the access token
    $params = [
        'code' => $_GET['code'],
        'client_id' => $google_oauth_client_id,
        'client_secret' => $google_oauth_client_secret,
        'redirect_uri' => $google_oauth_redirect_uri,
        'grant_type' => 'authorization_code'
    ];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://accounts.google.com/o/oauth2/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    $response = json_decode($response, true);
    // Make sure access token is valid
    if (isset($response['access_token']) && !empty($response['access_token'])) {
        // Execute cURL request to retrieve the user info associated with the Google account
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.googleapis.com/oauth2/' . $google_oauth_version . '/userinfo');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $response['access_token']]);
        $response = curl_exec($ch);
        curl_close($ch);
        $profile = json_decode($response, true);
        // Make sure the profile data exists
        if (isset($profile['email'])) {
            $google_name_parts = [];
            $google_name_parts[] = isset($profile['given_name']) ? preg_replace('/[^a-zA-Z0-9]/s', '', $profile['given_name']) : '';
            $google_name_parts[] = isset($profile['family_name']) ? preg_replace('/[^a-zA-Z0-9]/s', '', $profile['family_name']) : '';
            // Authenticate the user
            session_regenerate_id();
            $email = $profile['email'];
            $nombre = implode(' ', $google_name_parts);

			// Verifica si el usuario ya está registrado
			$query = $conn->prepare("SELECT * FROM usuario WHERE email = :email");
			$query->bindParam(':email', $email);
			$query->execute();

			if ($query->rowCount() > 0) {
				// Usuario ya registrado, iniciar sesión
				$user = $query->fetch(PDO::FETCH_ASSOC);
				$_SESSION['user_email'] = $email;
				$_SESSION['user_id'] = $user['id_usuario'];
				$_SESSION['user_name'] = $user['nombre'];
				$_SESSION['user_type'] = $user['tipo_usuario'];
				header("Location: boletines.php");
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
					$userId = $conn->lastInsertId();
					// Consultar la información del usuario recién creado
					$query = $conn->prepare("SELECT * FROM usuario WHERE id_usuario = :userId");
					$query->bindParam(':userId', $userId, PDO::PARAM_INT);
					$query->execute();
					$user = $query->fetch(PDO::FETCH_ASSOC);
					$_SESSION['user_email'] = $email;
					$_SESSION['user_id'] = $user['id_usuario'];
					$_SESSION['user_name'] = $user['nombre'];
					$_SESSION['user_type'] = $user['tipo_usuario'];
					header("Location: boletines.php");
					exit;
				} else {
					echo "Hubo un error al registrar el usuario.";
				}
			}
        } else {
            exit('Could not retrieve profile information! Please try again later!');
        }
    } else {
        exit('Invalid access token! Please try again later!');
    }
} else {
    // Define params and redirect to Google Authentication page
    $params = [
        'response_type' => 'code',
        'client_id' => $google_oauth_client_id,
        'redirect_uri' => $google_oauth_redirect_uri,
        'scope' => 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        'access_type' => 'offline',
        'prompt' => 'consent'
    ];
    header('Location: https://accounts.google.com/o/oauth2/auth?' . http_build_query($params));
    exit;
}
?>
