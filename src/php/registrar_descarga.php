<?php
session_start();
include 'includes/dbinc.php'; // Configuración de la base de datos

if (isset($_GET['id_boletin'])) {
    $id_boletin = intval($_GET['id_boletin']);
    $id_usuario = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
    $fecha_descarga = date('Y-m-d');

    try {
        // Registrar la descarga en la base de datos
        $stmt = $conn->prepare("INSERT INTO descarga (id_boletin, id_usuario, fecha_descarga) VALUES (:id_boletin, :id_usuario, :fecha_descarga)");
        $stmt->execute([
            ':id_boletin' => $id_boletin,
            ':id_usuario' => $id_usuario,
            ':fecha_descarga' => $fecha_descarga,
        ]);

        // Obtener la ruta del archivo
        $stmt = $conn->prepare("SELECT ruta_archivo FROM boletin WHERE id_boletin = :id_boletin");
        $stmt->execute([':id_boletin' => $id_boletin]);
        $boletin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($boletin) {
            $file_path = $boletin['ruta_archivo'];

            // Verificar si el archivo existe
            if (file_exists($file_path)) {
                // Forzar la descarga del archivo
                header('Content-Description: File Transfer');
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($file_path));

                // Leer el archivo y enviarlo al cliente
                readfile($file_path);
                header("Location: boletines.php");
                exit;
            } else {
                echo "El archivo no existe.";
            }
        } else {
            echo "Archivo no encontrado.";
        }
    } catch (PDOException $e) {
        echo "Error al registrar la descarga: " . $e->getMessage();
    }
} else {
    echo "ID de boletín no proporcionado.";
}