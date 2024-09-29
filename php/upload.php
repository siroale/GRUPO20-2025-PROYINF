<?php
include "includes/dbinc.php";
if (isset($_POST["submit"])) {
    // Verifica si se seleccionó un archivo
    if (isset($_FILES["file"]) && $_FILES["file"]["error"] == 0) {
        $target_dir = "../uploads/"; // Carpeta donde se guardarán los archivos
        $target_file = $target_dir . basename($_FILES["file"]["name"]);
        $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $upload_ok = 1;

        // Verifica si el archivo ya existe
        if (file_exists($target_file)) {
            echo "El archivo ya existe.";
            $upload_ok = 0;
        }

        // Verifica el tamaño del archivo (limite de 5MB)
        if ($_FILES["file"]["size"] > 5000000) {
            echo "El archivo es demasiado grande.";
            $upload_ok = 0;
        }

        // Opcional: Limitar tipos de archivos permitidos (ej. imágenes y pdf)
        $allowed_types = ["pdf"];
        if (!in_array($file_type, $allowed_types)) {
            echo "Solo se permiten archivos PDF.";
            $upload_ok = 0;
        }

        // Si todo está bien, intenta mover el archivo al servidor
        if ($upload_ok == 1) {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                echo "El archivo " . htmlspecialchars(basename($_FILES["file"]["name"])) . " ha sido subido.";
                echo "Hola???";
                // 2. Guardar la ruta del archivo en la base de datos usando PDO
                $file_path = $target_file; // Ruta completa del archivo
                
                // Preparar la consulta SQL
                $sql = "INSERT INTO boletines (src) VALUES (:src)";
                echo "Ruta del archivo: " . htmlspecialchars($file_path) . "<br>";
                var_dump($pdo);
                $stmt = $conn->prepare($sql);
                var_dump($pdo);
                echo "Ruta del archivo: " . htmlspecialchars($file_path) . "<br>";
                if ($stmt === false) {
                    echo "Error al preparar la consulta.<br>";
                }
                else {
                    echo "Consulta preparada correctamente.<br>";
                }
    
                echo "Ruta del archivo: " . htmlspecialchars($file_path) . "<br>";
                
                // Ejecutar la consulta
                echo "Intentando guardar en la base de datos...<br>";
                try {
                    $stmt->execute(['src' => $file_path]);
                    echo "<br>La ruta del archivo se ha guardado correctamente en la base de datos.";
                } catch (PDOException $e) {
                    echo "<br>Error al guardar en la base de datos: " . $e->getMessage();
                }
            } else {
                echo "Hubo un error al subir el archivo.";
            }
        }
    } else {
        echo "No se ha seleccionado ningún archivo o hubo un error.";
    }
    if ($_FILES["file"]["error"] !== 0) {
        echo "Error en la carga: " . $_FILES["file"]["error"];
    }
}

$pdo = null;
?>