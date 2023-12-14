<?php

include("conexion.php");

$consultaCatalogo = "SELECT * FROM catalogo";
$consultaCBC = "SELECT * FROM catalogo";
$consultaCBG = "SELECT * FROM catalogo";

$resultadoCC = mysqli_query($con, $consultaCatalogo);
$saldoDebe = 0;
$saldoHaber = 0;
$ingresos = 0;
$egresos = 0;
$perdidaGanancia = 0;
$saldoDebeBG = 0;
$saldoHaberBG = 0;
$stack = [];
$stackFilasPerdidas = [];
$stackPerdidas = [];
$stackFilasBalanceC = [];
$stackBalanceC = [];
$stackFilasBalanceG = [];
$stackBalanceG = [];
$stackResultados = [];
//Acá se guardan los valores de los debe y haber utilizados en los desgloces
$valoresDBalanceC = [];
$valoresHBalanceC = [];
$valoresDBalanceG = [];
$valoresHBalanceG = [];

//Perdidas


if ($resultadoCC) {

    while ($rowCatalogo = $resultadoCC->fetch_array()) {

        $saldo = $rowCatalogo['saldo']; //obtiene el dato del campo saldo de catalogo
        $saldoNormal = $rowCatalogo['saldoNormal'];
        $codigo = $rowCatalogo['codigo'];
        $nombre = $rowCatalogo['nombre'];

        //ingresos

        //si existe un valor en saldo
        if ($saldo != 0) {

            if ($codigo == 310) {
                array_push($stackFilasPerdidas, $codigo, $nombre, $saldo);
                array_push($stackPerdidas, $stackFilasPerdidas);
                $ingresos += $saldo;
            }

            //para que el saldo se agregue en el debe
            //GASTOS
            if ($saldoNormal == '1' && $saldo > 0 || $saldoNormal == '0' && $saldo < 0) {
                //balance de comprobacion
                if ($codigo != 700) {
                    array_push($stackFilasBalanceC, $codigo, $nombre, $saldo);
                    array_push($stackBalanceC, $stackFilasBalanceC);
                    array_push($valoresDBalanceC, $saldo);
                    $saldoDebe += $saldo;
                }

                //balance general
                if (($codigo < 500 || $codigo > 595) && $codigo != 310) {
                    array_push($stackFilasBalanceG, $codigo, $nombre, $saldo);
                    array_push($stackBalanceG, $stackFilasBalanceG);
                    array_push($valoresDBalanceG, $saldo);
                    $saldoDebeBG += $saldo;
                }

                //perdidas y ganancias
                if ($codigo >= 500 && $codigo <= 595) {
                    array_push($stackFilasPerdidas, $codigo, $nombre, $saldo);
                    array_push($stackPerdidas, $stackFilasPerdidas);
                    $egresos += $saldo;
                }

                //para que el saldo se agregue en el haber
                //
            }
            if ($saldoNormal == '1' && $saldo < 0 || $saldoNormal == '0' && $saldo > 0) {
                //balance de comprobacion
                if ($codigo != 700) {
                    array_push($stackFilasBalanceC, $codigo, $nombre, $saldo);
                    array_push($stackBalanceC, $stackFilasBalanceC);
                    array_push($valoresHBalanceC, $saldo);
                    $saldoHaber += $saldo;
                }

                //balance general
                if (($codigo < 500 || $codigo > 595) && $codigo != 310) {
                    array_push($stackFilasBalanceG, $codigo, $nombre, $saldo);
                    array_push($stackBalanceG, $stackFilasBalanceG);
                    array_push($valoresHBalanceG, $saldo);
                    $saldoHaberBG += $saldo;
                }

                //perdidas y ganancias
                if ($codigo >= 500 && $codigo <= 595) {
                    array_push($stackFilasPerdidas, $codigo, $nombre, $saldo);
                    array_push($stackPerdidas, $stackFilasPerdidas);
                    $egresos += $saldo;
                }
            }
        }
        $stackFilasPerdidas = [];
        $stackFilasBalanceC = [];
        $stackFilasBalanceG = [];
    }

    //determina cual es el mayor para restar el mayor contra el menor 
    //y actualiza el saldo normal si son perdidas coloca debe, si son ganancias coloca haber
    if ($ingresos > $egresos) {

        $perdidaGanancia = $ingresos - $egresos;
        $update = "UPDATE catalogo SET saldoNormal = 0 WHERE codigo = '700'";
        $result = mysqli_query($con, $update);
    } else {
        $perdidaGanancia = $egresos - $ingresos;
        $update1 = "UPDATE catalogo SET saldoNormal = 1 WHERE codigo = '700'";
        $result = mysqli_query($con, $update1);
        //echo $egresos." - ".$ingresos." = ".$perdidaGanancia;
    }

    $update2 = "UPDATE catalogo SET saldo = $perdidaGanancia WHERE codigo = '700'";

    $result = mysqli_query($con, $update2);

    /*if ($result) {
                if ($perdidaGanancia > 0) {
                    echo "Hay ganancias = " . $perdidaGanancia;
                } else {
                    echo "Hay perdidas = " . $perdidaGanancia;
                }
            }*/

    //PERDIDAS Y GANANCIAS

    //Egresos => retiro de socios, electricidad, seguros, salarios, combustible, telefono, internet
    //           = 500 a 595
    //Ingresos => renta pagada por adelantado, aporte de socios, ingresos = de 300 a 395
}

array_push(
    $stackResultados,
    $saldoDebe,
    $saldoHaber,
    $perdidaGanancia,
    $saldoDebeBG,
    $saldoHaberBG
);

array_push(
    $stack,
    $stackPerdidas, //0
    $stackBalanceC, //1
    $stackBalanceG, //2
    $stackResultados, //3
    $valoresDBalanceC, //4
    $valoresHBalanceC, //5
    $valoresDBalanceG, //6
    $valoresHBalanceG //7
);
print json_encode($stack);
