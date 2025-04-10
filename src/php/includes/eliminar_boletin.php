<?php
require 'dbinc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el id_boletin y la ruta del archivo a eliminar
    $id_boletin = $_POST['id_boletin'];
    $ruta_archivo = '../' . $_POST['ruta_archivo'];

    try {
        // Iniciar una transacción para asegurarse de que se eliminan ambos, el archivo y el registro
        $conn->beginTransaction();

        // Eliminar el boletín de la base de datos
        $sql = "DELETE FROM boletin WHERE id_boletin = :id_boletin";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_boletin', $id_boletin);

        if ($stmt->execute()) {
            // Si se elimina de la base de datos correctamente, eliminar el archivo del sistema de archivos
            if (file_exists($ruta_archivo)) {
                if (unlink($ruta_archivo)) {
                    // Confirmar la transacción si se elimina el archivo
                    $conn->commit();
                    header("Location: ../creacion.php");
                } else {
                    // Si falla la eliminación del archivo, hacer rollback
                    $conn->rollBack();
                }
            } else {
                // Si el archivo no existe, de todas formas hacer commit (el boletín ya no está en la base de datos)
                $conn->commit();
            }
        } else {
            $_SESSION['error_message'] = "Error al eliminar el boletín de la base de datos.";
        }
    } catch (PDOException $e) {
        // Hacer rollback si hay algún error
        $conn->rollBack();
        $_SESSION['error_message'] = "Error: " . $e->getMessage();
    }
}
?>
