<?php
require 'includes/dbinc.php';

try {
    // Preparar la consulta para solicitudes
    $sql = "SELECT * FROM solicitudes ORDER BY fecha_solicitud";
    $stmt = $conn->prepare($sql);
    
    // Ejecutar la consulta
    $stmt->execute();
    
    // Obtener los resultados
    $solicitudes = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // Manejar errores de consulta
    $solicitudes = [];
    error_log("Error al recuperar solicitudes: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Generación de Boletín</title>
    <style>
        /* Estilos anteriores */
    </style>
</head>
<body>
    <h1>Generación de Boletín</h1>

    <!-- Formulario de Creación de Boletín -->
    <form action="procesar.php" method="POST">
        <h2>Crear Nueva Solicitud de Boletín</h2>
        <div>
            <label for="titulo">Título del Boletín:</label>
            <input type="text" id="titulo" name="titulo" required placeholder="Ingrese el título del boletín">
        </div>
        <div>
            <label for="contexto">Contexto/Descripción:</label>
            <textarea id="contexto" name="contexto" rows="4" placeholder="Descripción adicional de la solicitud"></textarea>
        </div>
        <button type="submit">Crear Solicitud</button>
    </form>

    <!-- Tabla de Solicitudes Existentes -->
    <h2>Solicitudes Ingresadas</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Solicitado Por</th>
                <th>Fecha de Solicitud</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($solicitudes)): ?>
                <tr>
                    <td colspan="4" style="text-align: center;">No hay solicitudes registradas</td>
                </tr>
            <?php else: ?>
                <?php foreach ($solicitudes as $solicitud): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($solicitud['id_solicitud']); ?></td>
                        <td><?php echo htmlspecialchars($solicitud['titulo']); ?></td>
                        <td><?php echo htmlspecialchars($solicitud['solicitado_por']); ?></td>
                        <td><?php echo htmlspecialchars($solicitud['fecha_solicitud']); ?></td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>
</body>
</html>