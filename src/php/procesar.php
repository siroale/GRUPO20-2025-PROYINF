<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $titulo = $_POST['titulo'] ?? '';
    $contexto = $_POST['contexto'] ?? '';

    // Comando para ejecutar el script de Python
    $comando = "python3 /var/www/ai_logic/procesar_evento.py " . 
               escapeshellarg($titulo) . " " .
               escapeshellarg($contexto);

    // Ejecutar script de Python
    $output = shell_exec($comando);

    // Mostrar resultado
    echo "<h2>Procesamiento Completado</h2>";
    echo "<pre>$output</pre>";
}
?>