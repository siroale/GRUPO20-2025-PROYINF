<?php
require 'includes/dbinc.php';

try {
    // Preparar la consulta
    $sql = "SELECT 
            b.id_boletin, 
            b.ruta_archivo, 
            b.fecha_publicacion, 
            b.titulo, 
            b.descripcion, 
            b.estado, 
            b.veces_visitado, 
            u.nombre AS subido_por, 
            COUNT(d.id_descarga) AS veces_descargado
        FROM boletin b
        JOIN usuario u ON b.subido_por = u.id_usuario
        LEFT JOIN descarga d ON b.id_boletin = d.id_boletin
        GROUP BY b.id_boletin";
    $stmt = $conn->prepare($sql);

    // Ejecutar la consulta
    $stmt->execute();

    // Obtener los resultados
    $boletines = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Boletines</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="table-container">
        <?php if ($boletines): ?>
            <table>
                <thead>
                    <tr>
                        <th>Ruta del Archivo</th>
                        <th>Fecha de Publicación</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Veces Visitado</th>
                        <th>Veces Descargado</th>
                        <th>Subido por</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($boletines as $boletin): 
                        $id_boletin = htmlspecialchars($boletin['id_boletin']);
                    ?>
                        <tr>
                            <td><a href="<?= htmlspecialchars($boletin['ruta_archivo']) ?>">Ver archivo</a></td>
                            <td><?= htmlspecialchars($boletin['fecha_publicacion']) ?></td>
                            <td><?= htmlspecialchars($boletin['titulo']) ?></td>
                            <td><?= htmlspecialchars($boletin['descripcion']) ?></td>
                            <td><?= htmlspecialchars($boletin['estado']) ?></td>
                            <td><?= htmlspecialchars($boletin['veces_visitado']) ?></td>
                            <td><?= htmlspecialchars($boletin['veces_descargado']) ?></td>
                            <td><?= htmlspecialchars($boletin['subido_por']) ?></td>
                            <td>
                                <div class="action-buttons">
                                    <!-- Eliminar boletin -->
                                    <form method='POST' action='includes/eliminar_boletin.php' onsubmit='return confirm("¿Estás seguro de que deseas eliminar este boletín?");'>
                                        <input type='hidden' name='id_boletin' value='<?= $id_boletin ?>'>
                                        <input type='hidden' name='ruta_archivo' value='<?= htmlspecialchars($boletin['ruta_archivo']) ?>'>
                                        <button class='Btn' type='submit'>Eliminar</button>
                                    </form>

                                    <!-- Activar/Desactivar boletin -->
                                    <form method='POST' action='includes/activar_desactivar.php'>
                                        <input type='hidden' name='id_boletin' value='<?= $id_boletin ?>'>
                                        <input type='hidden' name='estado_actual' value='<?= htmlspecialchars($boletin['estado']) ?>'>
                                        <button class='Btn' type='submit'>
                                            <?= $boletin['estado'] === 'activo' ? 'Desactivar' : 'Activar' ?>
                                        </button>
                                    </form>

                                    <!-- Descargar archivo -->
                                    <a href='<?= htmlspecialchars($boletin['ruta_archivo']) ?>' download>
                                        <button class='Btn' type='button'>Descargar</button>
                                    </a>

                                    <!-- Botón para mostrar formulario de actualización -->
                                    <button class='Btn' type='button' onclick='mostrarFormularioActualizar("form-actualizar-<?= $id_boletin ?>")'>
                                        Actualizar Archivo
                                    </button>
                                </div>

                                <!-- Formulario de actualización -->
                                <form id='form-actualizar-<?= $id_boletin ?>' class='update-form' method='POST' action='actualizar_archivo.php' enctype='multipart/form-data'>
                                    <input type='hidden' name='id_boletin' value='<?= $id_boletin ?>'>
                                    
                                    <label for='nuevo_titulo-<?= $id_boletin ?>'>Nuevo Título:</label>
                                    <input type='text' name='nuevo_titulo' id='nuevo_titulo-<?= $id_boletin ?>' 
                                           value='<?= htmlspecialchars($boletin['titulo']) ?>' required>
                                    
                                    <label for='nueva_descripcion-<?= $id_boletin ?>'>Nueva Descripción:</label>
                                    <textarea name='nueva_descripcion' id='nueva_descripcion-<?= $id_boletin ?>' required>
                                        <?= htmlspecialchars($boletin['descripcion']) ?>
                                    </textarea>
                                    
                                    <input type='file' name='nuevo_archivo' accept='.pdf' required>
                                    <button class='Btn' type='submit'>Confirmar</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>No hay boletines disponibles.</p>
        <?php endif; ?>
    </div>

    <script>
    // Función para mostrar u ocultar el formulario de actualización
function mostrarFormularioActualizar(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.classList.toggle('visible'); // Alterna la visibilidad del formulario
        if (form.classList.contains('visible')) {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    }
}
    </script>
</body>
</html>

<?php
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>