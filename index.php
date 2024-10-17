<head>

<link rel="stylesheet" href="../css/navbar.css">

</head>

<?php
// Esto asegura que los errores sean visibles para debugging (desactivarlo en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Carga archivos importantes o incluye otros componentes
require 'php/includes/dbinc.php';

// Aquí puedes poner el contenido principal de tu página
echo "<h1>Bienvenido a mi sitio web</h1>";
echo "<p>Este es el archivo de inicio de mi aplicación web.</p>";

header("Location: landing.php");
// Enlaces de navegación u otros contenidos
?>

<body>
    <h1>Bienvenido</h1>
    <ul>
        <li><a href="php/creacion.php">Creacion de boletines</a></li>
        <li><a href="php/visualizacion.php">Visualizacion de boletines</a></li>
    </ul>
    <h1>Bienvenido</h1>
</body>