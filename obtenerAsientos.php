<?php

include("conexion.php");

$consultaAsientos = "SELECT * FROM asientos where estado = 1";

$resultadoCA = mysqli_query($con, $consultaAsientos);
$stack = [];
$stackAsientos = [];

//Perdidas


if ($resultadoCA) {

    while ($rowAsiento = $resultadoCA->fetch_array()) {
        $codigo = $rowAsiento['codigo'];
        $nombre = $rowAsiento['nombre'];
        $monto = $rowAsiento['monto'];
        $tipo = $rowAsiento['tipo'];
        $fecha = $rowAsiento['fecha'];
        $hora = $rowAsiento['hora'];
        $estado = $rowAsiento['estado'];

        array_push($stackAsientos, $codigo, $nombre, $monto, $tipo, $fecha, $hora, $estado);
        array_push($stack, $stackAsientos);
        $stackAsientos = [];
    }
}

print json_encode($stack);
