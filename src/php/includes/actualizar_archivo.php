<?php
require 'dbinc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_boletin = $_POST['id_boletin'];
    $nuevo_archivo = $_FILES['nuevo_archivo'];
    $nuevo_nombre = $_POST['nuevo_titulo'];
    $nueva_descripcion = $_POST['nueva_descripcion'];
    try {
        // Obtener la ruta actual del archivo del boletín
        $sql = "SELECT ruta_archivo FROM boletin WHERE id_boletin = :id_boletin";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_boletin', $id_boletin, PDO::PARAM_INT);
        $stmt->execute();
        $boletin = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$boletin) {
            echo "Error: El boletín no existe.";
            exit;
        }

        $ruta_actual = $boletin['ruta_archivo'];

        // Mover el nuevo archivo al directorio deseado
        $upload_dir = '../../uploads/';
        $nombre_ruta = uniqid() . '-' . basename($nuevo_archivo['name']);
        $nueva_ruta = $upload_dir . $nombre_ruta;

        if (!move_uploaded_file($nuevo_archivo['tmp_name'], $nueva_ruta)) {
            echo "Error al subir el archivo.";
            exit;
        }

        // Actualizar el archivo en la base de datos
        $sql = "UPDATE boletin SET 
        titulo = :nuevo_nombre, 
        descripcion = :nueva_descripcion, 
        ruta_archivo = :nueva_ruta 
        WHERE id_boletin = :id_boletin";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nuevo_nombre', $nuevo_nombre, PDO::PARAM_STR);
        $stmt->bindParam(':nueva_descripcion', $nueva_descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':nueva_ruta', $nueva_ruta, PDO::PARAM_STR);
        $stmt->bindParam(':id_boletin', $id_boletin, PDO::PARAM_INT);

        if ($stmt->execute()) {
            // Borrar el archivo anterior si existe
            if (file_exists($ruta_actual)) {
                unlink($ruta_actual);
            }

            header("Location: ../creacion.php");
            exit;
        } else {
            echo "Error al actualizar la base de datos.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Método no permitido.";
}
?>
