<?php
require 'includes/dbinc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_boletin = $_POST['id_boletin'];
    $nuevo_archivo = $_FILES['nuevo_archivo'];
    $nuevo_nombre = trim($_POST['nuevo_titulo']);
    $nueva_descripcion = trim($_POST['nueva_descripcion']);

    try {
        // Verificar si el boletín existe
        $sql = "SELECT ruta_archivo FROM boletin WHERE id_boletin = :id_boletin";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_boletin', $id_boletin, PDO::PARAM_INT);
        $stmt->execute();
        $boletin = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$boletin) {
            echo "Error: El boletín no existe.";
            exit;
        }

        $ruta_actual = $boletin['ruta_archivo']; // Ruta del archivo anterior

        // Validar y subir el nuevo archivo
        $upload_dir = '../uploads/';
        $nombre_archivo = uniqid() . '-' . basename($nuevo_archivo['name']);
        $ruta_nueva = $upload_dir . $nombre_archivo;

        if (!move_uploaded_file($nuevo_archivo['tmp_name'], $ruta_nueva)) {
            echo "Error al subir el archivo.";
            exit;
        }

        // Actualizar el boletín en la base de datos
        $sql = "UPDATE boletin 
                SET titulo = :nuevo_nombre, 
                    descripcion = :nueva_descripcion, 
                    ruta_archivo = :ruta_nueva 
                WHERE id_boletin = :id_boletin";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nuevo_nombre', $nuevo_nombre, PDO::PARAM_STR);
        $stmt->bindParam(':nueva_descripcion', $nueva_descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':ruta_nueva', $ruta_nueva, PDO::PARAM_STR);
        $stmt->bindParam(':id_boletin', $id_boletin, PDO::PARAM_INT);

        if ($stmt->execute()) {
            // Eliminar el archivo anterior si la actualización fue exitosa
            if (file_exists($ruta_actual)) {
                unlink($ruta_actual);
            }

            // Redirigir al usuario con éxito
            header("Location: creacion.php");
            exit;
        } else {
            echo "Error al actualizar el boletín.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Método no permitido.";
}
?>
