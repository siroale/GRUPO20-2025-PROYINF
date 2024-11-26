<?php
include 'includes/dbinc.php';
ini_set('display_errors', 1); // Mostrar errores de PHP

// Verificar si se han recibido los datos
if (isset($_POST['id_boletin']) && isset($_POST['ruta_archivo']) && is_numeric($_POST['id_boletin'])) {
    $idBoletin = intval($_POST['id_boletin']);
    $rutaArchivo = $_POST['ruta_archivo'];

    try {
        // Actualizar el atributo veces_visitado
        $query = "UPDATE boletin SET veces_visitado = veces_visitado + 1 WHERE id_boletin = :id_boletin";
        $stmt = $conn->prepare($query);
        
        // Enlazar parámetros usando PDO
        $stmt->bindParam(':id_boletin', $idBoletin, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            header("Location: $rutaArchivo");
            exit;
        } else {
            echo "Error al ejecutar la consulta.";
        }
    } catch (PDOException $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
} else {
    echo "Datos inválidos o incompletos.";
}
?>
