<?php
require 'dbinc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_boletin = $_POST['id_boletin'];
    $estado_actual = $_POST['estado_actual'];

    // Determinar el nuevo estado
    $nuevo_estado = ($estado_actual === 'activo') ? 'noactivo' : 'activo';

    try {
        // Actualizar el estado en la base de datos
        $sql = "UPDATE boletin SET estado = :nuevo_estado WHERE id_boletin = :id_boletin";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nuevo_estado', $nuevo_estado, PDO::PARAM_STR);
        $stmt->bindParam(':id_boletin', $id_boletin, PDO::PARAM_INT);

        if ($stmt->execute()) {
            header('Location: ../creacion.php');
            exit;
        } else {
            echo "Error al actualizar el estado.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Método no permitido.";
}
?>
