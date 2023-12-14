<?php


include("conexion.php");


$datosMatrix = json_decode($_POST['matrizDatos'], true);

foreach ($datosMatrix as $datoMatrix) {
  $codigo = $con->real_escape_string($datoMatrix['codigo']);
  $monto = $con->real_escape_string($datoMatrix['monto']);
  $tipo = $con->real_escape_string($datoMatrix['tipo']);
  $fecha = $con->real_escape_string($datoMatrix['fecha']);
  $hora = $con->real_escape_string($datoMatrix['hora']);
  $estado = $con->real_escape_string($datoMatrix['estado']);
  $sql = "";
  if ($datoMatrix['estado']!=1) {
$sql = "INSERT INTO asientos (codigo, monto, tipo, fecha, hora, estado) VALUES ('$codigo', '$monto', '$tipo','$fecha','$hora', '$estado')";
  } else {
    $sql = "UPDATE asientos SET estado = 0 WHERE codigo = $codigo";
  }
  
  if ($con->query($sql) !== TRUE) {
    echo "Error al insertar datos: " . $con->error;
  }

  $saldo = 0;
  $saldoCatalogo = "";

  $consultaCatalogo = "SELECT saldo FROM catalogo WHERE codigo = $codigo";

  $saldoCatalogo = $con->query($consultaCatalogo)->fetch_assoc()['saldo']; //obtiene el dato del campo saldo de catalogo
  echo $saldoCatalogo;
  if ($tipo == '1') {
    $saldo = (int)$saldoCatalogo + (int)$monto; //suma los debe

    $update = "UPDATE catalogo SET saldo = $saldo WHERE codigo = $codigo";

    $result = mysqli_query($con, $update);
    //echo "suma Codigo =" . $codigo . " saldo =" . $saldo . " ,";

    //echo  "saldo en suma ".$codigo." - ".$saldo." # ";
    //si el tipo es haber

    //si es haber resta el monto de asientos contra el saldo de catalogo
  } else if ($tipo == '0') {
    if ((int)$saldoCatalogo - (int)$monto < 0) {
      $saldo = -((int)$saldoCatalogo - (int)$monto);
    } else {
      $saldo = (int)$saldoCatalogo - (int)$monto;
    }
    $update = "UPDATE catalogo SET saldo = $saldo WHERE codigo = $codigo";

    $result = mysqli_query($con, $update);
    //echo  "saldo en resta ".$codigo." - ".$saldo." # ";
    //echo "resta Codigo =" . $codigo . " saldo =" . $saldo . " ,";
  }
}
