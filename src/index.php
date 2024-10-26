<?php
// Esto asegura que los errores sean visibles para debugging (desactivarlo en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Carga archivos importantes o incluye otros componentes
require 'php/includes/dbinc.php';

// header("Location: php/visualizacion.php");
// Enlaces de navegación u otros contenidos
?>

<body>
    <h1>Indice</h1>
    <ul>
        <li><a href="php/landing.php">Sitio Admininistración</a></li>
        <li><a href="php/visualizacion.php">Sitio Público</a></li>
    </ul>
	
	<h2>Información Grupo</h2>
	<ul>
		<li><b>Grupo:</b> 1</li>
		<li>
			<b>Integrantes:</b>
			<ul>
				<li>Lucas Mosquera</li>
				<li>Andrés Águila</li>
				<li>Alexis Mellis</li>
				<li>Joaquín Dominguez</li>
			</ul>
		</li>
	</ul>
</body>
