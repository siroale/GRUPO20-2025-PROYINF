<?php
require 'includes/dbinc.php';

$response = [
    'status' => 'error',
    'message' => 'Solicitud no procesada'
];

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Validar que el título no esté vacío
        if (empty($_POST['titulo'])) {
            throw new Exception('El título no puede estar vacío');
        }

        $sql = "INSERT INTO solicitudes (titulo, solicitado_por, fecha_solicitud) VALUES (:titulo, :solicitado_por, CURDATE())";
        
        $stmt = $conn->prepare($sql);
        
        // Usar trim() para eliminar espacios en blanco
        $stmt->bindValue(':titulo', trim($_POST['titulo']), PDO::PARAM_STR);
        $stmt->bindValue(':solicitado_por', 'admin', PDO::PARAM_STR);
        
        $stmt->execute();
        
        $response = [
            'status' => 'success',
            'message' => 'Solicitud agregada correctamente',
            'id_solicitud' => $conn->lastInsertId(),
            'titulo' => $_POST['titulo'],
            'fecha' => date('Y-m-d')
        ];
    } else {
        $response['message'] = 'Método no permitido';
        http_response_code(405);
    }
} catch(PDOException $e) {
    $response = [
        'status' => 'error',
        'message' => 'Error al procesar la solicitud',
        'error_details' => $e->getMessage()
    ];
    http_response_code(500);
    error_log("Error en procesar.php: " . $e->getMessage());
} catch(Exception $e) {
    $response = [
        'status' => 'error',
        'message' => $e->getMessage()
    ];
    http_response_code(400);
}

header("Location: generar.php");
echo json_encode($response);