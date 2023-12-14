<?php


include("conexion.php");


$datoMatrix = json_decode($_POST['matrizFacturas'], true);

$codigo = $con->real_escape_string($datoMatrix[0]);
$nombre = $con->real_escape_string($datoMatrix[1]);
$monto = $con->real_escape_string($datoMatrix[2]);
$fecha = $con->real_escape_string($datoMatrix[3]);
$producto = $con->real_escape_string($datoMatrix[4]);
$sql = "INSERT INTO facturas (codigo, proveedor, producto, monto, fecha) VALUES ('$codigo', '$nombre', '$producto','$monto','$fecha')";
if ($con->query($sql) !== TRUE) {
  echo "Error al insertar datos: " . $con->error;
}

if ($codigo == "001") {
  $sql = "INSERT INTO asientos (codigo, nombre, monto, tipo, fecha, hora, estado) VALUES ('120', '$producto', '$monto', '1','$fecha','00:00:00', '1')";
  $result = mysqli_query($con, $sql);
  $sql = "INSERT INTO asientos (codigo, nombre, monto, tipo, fecha, hora, estado) VALUES ('400', '$producto', '$monto', '0','$fecha','00:00:00', '1')";
  $result = mysqli_query($con, $sql);
} else {
  $sql = "INSERT INTO asientos (codigo, nombre, monto, tipo, fecha, hora, estado) VALUES ('400', '$producto', '$monto', '1','$fecha','00:00:00', '1')";
  $result = mysqli_query($con, $sql);
  $sql = "INSERT INTO asientos (codigo, nombre, monto, tipo, fecha, hora, estado) VALUES ('100', '$producto', '$monto', '0','$fecha','00:00:00', '1')";
  $result = mysqli_query($con, $sql);

}
