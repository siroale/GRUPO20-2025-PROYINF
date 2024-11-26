<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8" />
<title>Generar Nuevo Boletin</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="description" content="" />
<link href="https://cdn.jsdelivr.net/npm/modern-normalize@v3.0.1/modern-normalize.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/generar.css" />
<link rel="icon" href="favicon.png">

<link rel="stylesheet" href="../css/style.css">


</head>

<body>

<a href="./boletines.php">Lista de Boletines</a>
<h1>Generar nuevo boletín</h1>
	<form action="procesar.php" method="POST">
        <input type="text" name="titulo" placeholder="Título">
        <textarea name="contexto" placeholder="Contexto del informe"></textarea>
        <button type="submit">Enviar</button>
    </form>
<h2>Boletines en procesamiento</h2>
<ul>
	<li>Agricultura Sustentable <span><button>Revisar</button><button>Editar</button><button>Subir</button></span></li>
	<li>Recursos Hidricos <i>98%</i></li>
	<li>Hidroponía <i>45%</i></li>
</ul>
<script src="../js/generar.js"></script>

</body>

</html>
