<?php
// Ruta al archivo PDF mockup
$ruta_pdf = '../mockups/boletin_mockup.pdf';

// Verificar si el archivo existe
if (file_exists($ruta_pdf)) {
    // Enviar las cabeceras apropiadas para descargar el archivo
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . basename($ruta_pdf) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($ruta_pdf));
    
    // Limpiar la salida del buffer y leer el archivo
    flush(); 
    readfile($ruta_pdf);
    exit;
} else {
    echo "El archivo no existe.";
}
?>
