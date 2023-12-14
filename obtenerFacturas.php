<?php

include("conexion.php");

$consultaFacturas = "SELECT * FROM facturas";

$resultadoCF = mysqli_query($con, $consultaFacturas);
$stack = [];
$stackFacturas = [];

//Perdidas


if ($resultadoCF) {

    while ($rowFactura = $resultadoCF->fetch_array()) {
        $codigo = $rowFactura['codigo'];
        $proveedor = $rowFactura['proveedor'];
        $producto = $rowFactura['producto'];
        $monto = $rowFactura['monto'];
        $fecha = $rowFactura['fecha'];

        array_push($stackFacturas, $codigo, $proveedor, $producto, $monto, $fecha);
        array_push($stack, $stackFacturas);
        $stackFacturas = [];
    }
}

print json_encode($stack);
