<?php
// Conexión a la base de datos (reemplaza con tus propios datos)
include ("conexion.php");

// Verificar la conexión
if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}

// Obtener el código enviado por AJAX
$codigo = $_POST["codigo"];

// Realizar una consulta SQL para obtener el nombre
$sql = "SELECT nombre FROM proveedores WHERE codigo = '$codigo'";
$result = $con->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nombre = $row["nombre"];
    echo $nombre;
} else {
    echo "Código no encontrado"; // Si el código no existe en la base de datos
}

// Cerrar la conexión a la base de datos
$con->close();
?>