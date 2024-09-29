<!DOCTYPE html>

<head>

<link rel="stylesheet" href="../css/navbar.css">

</head>

<body>

    <?php include "includes/navbar.php" ?>
    <?php include "includes/dbinc.php" ?>

    <h2>Subir un Archivo</h2>
    <form action="upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="file" required>
    <input type="submit" name="submit" value="Subir Archivo">

</form>


</body>