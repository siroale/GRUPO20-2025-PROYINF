<?php
require 'dbinc.php';

try {
    // Preparar la consulta
    $sql = "SELECT b.id_boletin, b.ruta_archivo, b.fecha_publicacion, b.titulo, b.descripcion, b.estado, b.veces_visitado, u.nombre AS subido_por 
    FROM boletin b
    JOIN usuario u ON b.subido_por = u.id_usuario";
    $stmt = $conn->prepare($sql);

    // Ejecutar la consulta
    $stmt->execute();

    // Obtener los resultados
    $boletines = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($boletines) {
        // Mostrar los resultados en una tabla HTML
        echo "<table border='1'>";
        echo "<thead>";
        echo "<tr>";
        echo "<th>Ruta del Archivo</th>";
        echo "<th>Fecha de Publicación</th>";
        echo "<th>Título</th>";
        echo "<th>Descripción</th>";
        echo "<th>Estado</th>";
        echo "<th>Veces Visitado</th>";
        echo "<th>Subido por</th>";
        echo "<th>Acciones</th>";
        echo "</tr>";
        echo "</thead>";
        echo "<tbody>";

        // Recorrer cada fila y mostrar los datos
        foreach ($boletines as $boletin) {
            $id_boletin = htmlspecialchars($boletin['id_boletin']);
            echo "<tr>";
            echo "<td><a href='" . htmlspecialchars($boletin['ruta_archivo']) . "'>Ver archivo</a></td>";
            echo "<td>" . htmlspecialchars($boletin['fecha_publicacion']) . "</td>";
            echo "<td>" . htmlspecialchars($boletin['titulo']) . "</td>";
            echo "<td>" . htmlspecialchars($boletin['descripcion']) . "</td>";
            echo "<td>" . htmlspecialchars($boletin['estado']) . "</td>";
            echo "<td>" . htmlspecialchars($boletin['veces_visitado']) . "</td>";
            echo "<td>" . htmlspecialchars($boletin['subido_por']) . "</td>";
            echo "<td>";

            // Eliminar boletin
            echo "<form method='POST' action='includes/eliminar_boletin.php' onsubmit='return confirm(\"¿Estás seguro de que deseas eliminar este boletín?\");'>";
            echo "<input type='hidden' name='id_boletin' value='" . htmlspecialchars($boletin['id_boletin']) . "'>";
            echo "<input type='hidden' name='ruta_archivo' value='" . htmlspecialchars($boletin['ruta_archivo']) . "'>";
            echo "<button type='submit'>Eliminar</button>";
            echo "</form>";

            // Activar/Desactivar boletin
            echo "<form method='POST' action='includes/activar_desactivar.php' style='display:inline-block;'>";
            echo "<input type='hidden' name='id_boletin' value='" . htmlspecialchars($boletin['id_boletin']) . "'>";
            echo "<input type='hidden' name='estado_actual' value='" . htmlspecialchars($boletin['estado']) . "'>";
            echo "<button type='submit'>" . ($boletin['estado'] === 'activo' ? 'Desactivar' : 'Activar') . "</button>";
            echo "</form>";

            // Botón para descargar el archivo
            echo "<a href='" . htmlspecialchars($boletin['ruta_archivo']) . "' download style='margin-left: 5px;'>";
            echo "<button type='button'>Descargar</button>";
            echo "</a>";

            // Formulario para actualizar archivo
            echo "<button type='button' onclick='mostrarFormularioActualizar(\"form-actualizar-$id_boletin\")'>Actualizar Archivo</button>";
            echo "<form id='form-actualizar-$id_boletin' method='POST' action='includes/actualizar_archivo.php' enctype='multipart/form-data' style='display:none;'>";
            echo "<input type='hidden' name='id_boletin' value='" . htmlspecialchars($boletin['id_boletin']) . "'>";
            echo "<label for='nuevo_titulo-$id_boletin'>Nuevo Título:</label>";
            echo "<input type='text' name='nuevo_titulo' id='nuevo_titulo-$id_boletin' value='" . htmlspecialchars($boletin['titulo']) . "' required>";            
            echo "<label for='nueva_descripcion-$id_boletin'>Nueva Descripción:</label>";
            echo "<textarea name='nueva_descripcion' id='nueva_descripcion-$id_boletin' required>" . htmlspecialchars($boletin['descripcion']) . "</textarea>";
            echo "<input type='file' name='nuevo_archivo' accept='.pdf' required>";
            echo "<button type='submit'>Confirmar</button>";
            echo "</form>";

            echo "</td>";
            echo "</tr>";
        }

        echo "</tbody>";
        echo "</table>";
    } else {
        echo "No hay boletines disponibles.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

<script>
// Función para mostrar dinámicamente el formulario de actualización
function mostrarFormularioActualizar(formId) {
    const form = document.getElementById(formId);
    if (form.style.display === 'none') {
        form.style.display = 'inline-block';
    } else {
        form.style.display = 'none';
    }
}
</script>
