var tbl1;
var tblP;
var tblF;
var tblP1;
var tblBC;
var tblBC1;
var tblBG;
var tblBG1;
var totalRow;
var montoF = "0";
var monto = "0";
var montoMostrar = "0";
var montoMostrarF = "0";
var catalogo;
var totalRowT = 0;
var puede = 0;

var totalDebe = 0;
var totalHaber = 0;
var matrizDatos = [];
// Matriz global para almacenar los datos de los asientos 
var matrizDatos1 = [];


function cargar() {
  corregir();
  insertarFacturas();
  insertarAsientos();
  tbl1 = document.getElementById("tablaAsientos");
  tblP = document.getElementById("tablePerdidas");
  tblF = document.getElementById("tablaFacturas");
  tblP1 = document.getElementById("tablaPer");
  tblBC = document.getElementById("tablaBalanceC");
  tblBC1 = document.getElementById("tablaBalC");
  tblBG = document.getElementById("tablaBalanceG");
  tblBG1 = document.getElementById("tablaBalG");
  document.getElementById('opcionAsientos').style.display = 'none';
  document.getElementById('facturas').style.display = 'none';
  document.getElementById('divasF').style.display = 'none';
}

function cambiar() {
  if (document.getElementsByName("monto")[0].value.localeCompare("0") == 0) {
    document.getElementsByName("monto")[0].value = "";
  } else {
    document.getElementsByName("monto")[0].value = montoMostrar;
  }
  if (document.getElementsByName("montoF")[0].value.localeCompare("0") == 0) {
    document.getElementsByName("montoF")[0].value = "";
  } else {
    document.getElementsByName("montoF")[0].value = montoMostrarF;
  }
}

function enfoque() {
  montoMostrar = document.getElementsByName("monto")[0].value;
  monto = montoMostrar + "";
  document.getElementsByName("monto")[0].value = Intl.NumberFormat('en-US').format(montoMostrar);
  montoMostrarF = document.getElementsByName("montoF")[0].value;
  montoF = montoMostrarF + "";
  document.getElementsByName("montoF")[0].value = Intl.NumberFormat('en-US').format(montoMostrarF);
}

function limpioAsientos() {
  totalRow = tbl1.rows.length;
  if (totalRow > 1) {
    for (let p = 0; p < totalRow - 1; p++) {
      document.getElementById(`a${p}`).remove();
    }
  }
}

function carga() {
  location.reload();
}

function limpioBalances() {
  totalRowT = tblP.rows.length;
  if (totalRowT > 1) {
    for (let p = 0; p < totalRowT - 1; p++) {
      document.getElementById(`${p}P`).remove();
    }
  }
  document.getElementById(`PP1`).remove();
  document.getElementById(`PP2`).remove();
  document.getElementById(`BCD1`).remove();
  document.getElementById(`BCD2`).remove();
  document.getElementById(`BCH1`).remove();
  document.getElementById(`BCH2`).remove();
  document.getElementById(`BGD1`).remove();
  document.getElementById(`BGD2`).remove();
  document.getElementById(`BGH1`).remove();
  document.getElementById(`BGH2`).remove();
  totalRowT = tblBC.rows.length;
  if (totalRowT > 1) {
    for (let p = 0; p < totalRowT - 1; p++) {
      document.getElementById(`${p}BC`).remove();
    }
  }
  totalRowT = tblBG.rows.length;
  if (totalRowT > 1) {
    for (let p = 0; p < totalRowT - 1; p++) {
      document.getElementById(`${p}BG`).remove();
    }
  }
}

function limpioFacturas() {
  totalRow = tblF.rows.length;
  if (totalRow > 1) {
    for (let p = 0; p < totalRow - 1; p++) {
      document.getElementById(`${p}F`).remove();
    }
  }
}

//Aquí se cargan las tablas con los valores obtenidos del archivo BalanceComprobacion
function corregir() {
  var valores = [];//aquí se cargan los valores para el desgloce.
  var salidaDesgloce = "";
  var parametros = [];
  $.ajax({
    data: parametros,
    url: 'balanceComprobacion.php',
    type: 'POST', dataType: "json",
    success: function (mensaje) {
      for (let i = 0; i < mensaje[0].length; i++) {
        row = document.createElement("tr");
        row.setAttribute("id", `${i}P`);
        for (let j = 1; j < mensaje[0][i].length; j++) {
          console.log(mensaje[0][i][j]);
          cell = document.createElement("td");
          if (isNaN(mensaje[0][i][j])) {
            cellText = document.createTextNode(`${mensaje[0][i][j]}`);
          } else {
            cellText = document.createTextNode(`${"₡" + Intl.NumberFormat('en-US').format(mensaje[0][i][j])}`);
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
          console.log(row);
          tblP.appendChild(row);
        }
        valores[i] = mensaje[0][i][2];
      }
      for (let i = 0; i < valores.length; i++) {
        if (i == 0) {
          salidaDesgloce += "₡" + Intl.NumberFormat('en-US').format(valores[i]);
        } else {
          salidaDesgloce += " + " + "₡" + Intl.NumberFormat('en-US').format(valores[i]);
        }
      }
      salidaDesgloce += " = "
      if (mensaje[3][2] > 0) {
        row = document.createElement("tr");
        row.setAttribute("id", `PP1`);
        cell = document.createElement("td");
        cellText = document.createTextNode(`Ganancias Totales`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblP1.appendChild(row);
        row = document.createElement("tr");
        row.setAttribute("id", `PP2`);
        cell = document.createElement("td");
        //"₡"+Intl.NumberFormat('en-US').format()
        cellText = document.createTextNode(`${salidaDesgloce + "₡" + Intl.NumberFormat('en-US').format(mensaje[3][2])}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblP1.appendChild(row);
      } else {
        row = document.createElement("tr");
        row.setAttribute("id", `PP1`);
        cell = document.createElement("td");
        cellText = document.createTextNode(`Perdidas Totales`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblP1.appendChild(row);
        row = document.createElement("tr");
        row.setAttribute("id", `PP2`);
        cell = document.createElement("td");
        cellText = document.createTextNode(`${salidaDesgloce + "₡" + Intl.NumberFormat('en-US').format(mensaje[3][2])}`);
        cell.appendChild(cellText);
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblP1.appendChild(row);
      }
      salidaDesgloce = "";
      for (let i = 0; i < mensaje[1].length; i++) {
        row = document.createElement("tr");
        row.setAttribute("id", `${i}BC`);
        for (let j = 1; j < mensaje[1][i].length; j++) {
          cell = document.createElement("td");
          if (isNaN(mensaje[1][i][j])) {
            cellText = document.createTextNode(`${mensaje[1][i][j]}`);
          } else {
            cellText = document.createTextNode(`${"₡" + Intl.NumberFormat('en-US').format(mensaje[1][i][j])}`);
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
          tblBC.appendChild(row);
        }
      }
      for (let i = 0; i < mensaje[4].length; i++) {
        if (i == 0) {
          salidaDesgloce += "₡" + Intl.NumberFormat('en-US').format(mensaje[4][i]);
        } else {
          salidaDesgloce += " + " + "₡" + Intl.NumberFormat('en-US').format(mensaje[4][i]);
        }
      }
      salidaDesgloce += " = "
      row = document.createElement("tr");
      row.setAttribute("id", `BCD1`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`Debe`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBC1.appendChild(row);
      row = document.createElement("tr");
      row.setAttribute("id", `BCD2`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`${salidaDesgloce + "₡" + Intl.NumberFormat('en-US').format(mensaje[3][0])}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBC1.appendChild(row);

      salidaDesgloce = "";
      for (let i = 0; i < mensaje[5].length; i++) {
        if (i == 0) {
          salidaDesgloce += "₡" + Intl.NumberFormat('en-US').format(mensaje[5][i]);
        } else {
          salidaDesgloce += " + " + "₡" + Intl.NumberFormat('en-US').format(mensaje[5][i]);
        }
      }
      salidaDesgloce += " = "
      row = document.createElement("tr");
      row.setAttribute("id", `BCH1`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`Haber`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBC1.appendChild(row);
      row = document.createElement("tr");
      row.setAttribute("id", `BCH2`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`${salidaDesgloce + "₡" + Intl.NumberFormat('en-US').format(mensaje[3][1])}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBC1.appendChild(row);

      salidaDesgloce = "";
      for (let i = 0; i < mensaje[2].length; i++) {
        row = document.createElement("tr");
        row.setAttribute("id", `${i}BG`);
        for (let j = 1; j < mensaje[2][i].length; j++) {
          cell = document.createElement("td");
          if (isNaN(mensaje[2][i][j])) {
            cellText = document.createTextNode(`${mensaje[2][i][j]}`);
          } else {
            cellText = document.createTextNode(`${"₡" + Intl.NumberFormat('en-US').format(mensaje[2][i][j])}`);
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
          tblBG.appendChild(row);
        }
      }

      for (let i = 0; i < mensaje[6].length; i++) {
        if (i == 0) {
          salidaDesgloce += "₡" + Intl.NumberFormat('en-US').format(mensaje[6][i]);
        } else {
          salidaDesgloce += " + " + "₡" + Intl.NumberFormat('en-US').format(mensaje[6][i]);
        }
      }
      salidaDesgloce += " = "
      row = document.createElement("tr");
      row.setAttribute("id", `BGD1`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`Debe`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBG1.appendChild(row);
      row = document.createElement("tr");
      row.setAttribute("id", `BGD2`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`${salidaDesgloce + "₡" + Intl.NumberFormat('en-US').format(mensaje[3][3])}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBG1.appendChild(row);

      salidaDesgloce = "";
      for (let i = 0; i < mensaje[7].length; i++) {
        if (i == 0) {
          salidaDesgloce += "₡" + Intl.NumberFormat('en-US').format(mensaje[7][i]);
        } else {
          salidaDesgloce += " + " + "₡" + Intl.NumberFormat('en-US').format(mensaje[7][i]);
        }
      }
      salidaDesgloce += " = "
      row = document.createElement("tr");
      row.setAttribute("id", `BGH1`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`Haber`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBG1.appendChild(row);
      row = document.createElement("tr");
      row.setAttribute("id", `BGH2`);
      cell = document.createElement("td");
      cellText = document.createTextNode(`${salidaDesgloce + "₡" + Intl.NumberFormat('en-US').format(mensaje[3][4])}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBG1.appendChild(row);
    }
  });
}

function insertarFacturas() {
  var parametros = [];
  $.ajax({
    data: parametros,
    url: 'obtenerFacturas.php',
    type: 'POST', dataType: "json",
    success: function (mensaje) {
      for (let i = 0; i < mensaje.length; i++) {
        row = document.createElement("tr");
        row.setAttribute("id", `${i}F`);
        for (let j = 0; j < mensaje[i].length; j++) {
          cell = document.createElement("td");
          if (j != 3) {
            cellText = document.createTextNode(`${mensaje[i][j]}`);
          } else {
            cellText = document.createTextNode(`${"₡" + Intl.NumberFormat('en-US').format(mensaje[i][j])}`);
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        tblF.appendChild(row);
      }
    }
  });
}

function insertarAsientos() {
  var parametros = [];
  $.ajax({
    async: false,
    data: parametros,
    url: 'obtenerAsientos.php',
    type: 'POST', dataType: "json",
    success: function (mensaje) {
      matrizDatos = [];
      matrizDatos1 = [];
      puede = 0;
      for (let i = 0; i < mensaje.length; i++) {
        var nuevoDato = { codigo: mensaje[i][0], nombre: mensaje[i][1], monto: mensaje[i][2], tipo: mensaje[i][3], fecha: mensaje[i][4], hora: mensaje[i][5] , estado: mensaje[i][6]};
        matrizDatos.push(nuevoDato);
        matrizDatos1.push(mensaje[i]);
        puede += 1;
        actualizarTabla();
      }
    }
  });
  for (let i = 0; i < matrizDatos1.length; i++) {
    if (matrizDatos1[i][3] == "1") {
      totalDebe += parseInt(matrizDatos1[i][2]);
    } else {
      totalHaber += parseInt(matrizDatos1[i][2]);
    }
  }
}

function buscarNombre() {
  var codigo = document.getElementById('codigo').value; $.ajax({
    type: 'POST',
    url: 'buscarNombre.php',
    // Cambia esto al archivo PHP que realizará la búsqueda en la base de datos 
    data:
    {
      codigo:
        codigo
    },
    success: function (response) {
      document.getElementById('nombre').value = response;
      // Verificar si el código existe y habilitar/deshabilitar el botón en consecuencia 
    }
  });
}

function actualizarTabla() {
  document.getElementById("labelModalAsiento").innerHTML = "Asiento agregado de forma correcta";
  // Limpia la tabla actual
  $("#tablaAsientos tbody").empty();
  // Recorre la matriz y agrega filas a la tabla 
  for (var i = 0; i < matrizDatos1.length; i++) {
    var fila = "<tr id='a" + i + "'>";
    for (var j = 0; j < matrizDatos1[i].length-1; j++) {
      if (j == 3) {
        if (matrizDatos1[i][j] == 1) {
          fila += "<td>Debe</td>";
        }
        else {
          fila += "<td>Haber</td>";
        }
      }
      else {
        if (j != 2) {
          fila += "<td>" + matrizDatos1[i][j] + "</td>";
        }
        else {
          fila += "<td>" + "₡" + Intl.NumberFormat('en-US').format(matrizDatos1[i][j]) + "</td>";
        }
      }
    } fila += "</tr>"; $("#tablaAsientos tbody").append(fila);
  }
}

function guardarEnMatriz() {
  // Obtener los valores del formulario 
  var codigo = document.getElementById("codigo").value;
  var nombre = document.getElementById("nombre").value;
  var tipo = document.getElementById("tipo").value;
  var fecha = document.getElementById("fecha").value;
  var hora = document.getElementById("hora").value;
  var estado = "0";
  if (codigo.localeCompare("") == 0) {
    document.getElementById("labelModalAsiento").innerHTML = "Por favor ingresar un Codigo.";
  } else {
    if (nombre.localeCompare("Código no encontrado") == 0) {
      document.getElementById("labelModalAsiento").innerHTML = "Por favor ingresar un Codigo valido";
    } else {
      if (monto.localeCompare("") == 0 || monto.localeCompare("0") == 0) {
        document.getElementById("labelModalAsiento").innerHTML = "Por favor ingresar un monto valido";
      } else {
        var nuevoDato = { codigo: codigo, nombre: nombre, monto: monto, tipo: tipo, fecha: fecha, hora: hora , estado: estado};
        // Agregar datos a la matriz 
        matrizDatos1.push([codigo, nombre, monto, tipo, fecha, hora, estado]);
        matrizDatos.push(nuevoDato);
        // Actualizar la tabla con los datos de la matriz 
        actualizarTabla();
        document.getElementById("nombre").value = "";
        document.getElementById("codigo").value = "";
        document.getElementById("monto").value = "0";
        monto = 0;
        document.getElementById("tipo").value = "1";
        document.getElementById("fecha").value = "0000-00-00";
        document.getElementById("hora").value = "00:00";
        puede += 1;
      }
    }
  }
}

function guardaAsientos() {
  if (puede >= 2) {
    totalDebe = 0;
    totalHaber = 0;
    for (let i = 0; i < matrizDatos1.length; i++) {
      if (matrizDatos1[i][3] == "1") {
        totalDebe += parseInt(matrizDatos1[i][2]);
      } else {
        totalHaber += parseInt(matrizDatos1[i][2]);
      }
    }
    if (totalDebe != totalHaber) {
      document.getElementById("labelModal").innerHTML = "Los valores del debe y el haber se encuentran desbalanceados";
    } else {
      document.getElementById("labelModal").innerHTML = "Asiento finalizado existosamente";
      document.getElementById("nombre").value = "";
      document.getElementById("codigo").value = "";
      document.getElementById("monto").value = "0";
      document.getElementById("tipo").value = "1";
      document.getElementById("fecha").value = "0000-00-00";
      document.getElementById("hora").value = "00:00";
      $.ajax({
        type: "POST", url: "guardaAsientos.php",
        // Reemplaza con la URL correcta de tu archivo PHP 
        data: { matrizDatos: JSON.stringify(matrizDatos) },
        success: function (response) {
          // Puedes manejar la respuesta del servidor aquí si es necesario 
          console.log('Datos enviados al servidor:', response);
        }
      });
      totalDebe = 0;
      totalHaber = 0;
      matrizDatos1 = [];
      corregir();
      limpioAsientos();
      limpioBalances();
      puede = 0;
    }
    // Itera sobre los elementos de la matrizDatos 
    // Objeto con los datos que se enviarán al servidor 
    // Realiza una petición AJAX para insertar los datos en la base de datos 
  }
  else {
    document.getElementById("labelModal").innerHTML = "Favor ingresar más de un asiento antes de finalizar.";
  }
}

//oculta todos los elementos relacionados al manejo y la tabla de asientos, y muestra la parte relacionada a facturas
function ocultarAsientos() {
  document.getElementById('asientos').style.display = 'none';
  document.getElementById('divas').style.display = 'none';
  document.getElementById('tablas').style.display = 'none';
  document.getElementById('opcionAsientos').style.display = 'block';
  document.getElementById('divasF').style.display = 'block';
  document.getElementById('opcionFacturas').style.display = 'none';
  document.getElementById('facturas').style.display = 'block';
}

//oculta todos los elementos relacionados al manejo de facturas, y muestra la parte relacionada a asientos
function ocultarFacturas() {
  insertarAsientos();
  document.getElementById('opcionFacturas').style.display = 'block';
  document.getElementById('opcionAsientos').style.display = 'none';
  document.getElementById('facturas').style.display = 'none';
  document.getElementById('asientos').style.display = 'block';
  document.getElementById('divas').style.display = 'block';
  document.getElementById('divasF').style.display = 'none';
  document.getElementById('tablas').style.display = 'block';
}

function buscarNombreProveedor() {
  var codigo = document.getElementById('codigoF').value;
  $.ajax({
    type: 'POST',
    url: 'buscarNombreProveedor.php',
    // Cambia esto al archivo PHP que realizará la búsqueda en la base de datos 
    data:
    {
      codigo:
        codigo
    },
    success: function (response) {
      document.getElementById('nombreF').value = response;
      // Verificar si el código existe y habilitar/deshabilitar el botón en consecuencia 
    }
  });
}

function guardaFacturas() {
  var matrizFacturas = [];
  var codigo = document.getElementById("codigoF").value;
  var nombre = document.getElementById("nombreF").value;
  var fecha = document.getElementById("fechaF").value;
  var producto = document.getElementById("producto").value;
  matrizFacturas[0] = codigo;
  matrizFacturas[1] = nombre;
  matrizFacturas[2] = montoF;
  matrizFacturas[3] = fecha;
  matrizFacturas[4] = producto;
  if (codigo.localeCompare("") == 0) {
    document.getElementById("labelModalF").innerHTML = "Por favor ingresar un Codigo.";
  } else {
    if (nombre.localeCompare("Código no encontrado") == 0) {
      document.getElementById("labelModalF").innerHTML = "Por favor ingresar un Codigo valido";
    } else {
      if (producto.localeCompare("") == 0) {
        document.getElementById("labelModalF").innerHTML = "Por favor ingresar un nombre de producto valido";
      } else {
        if (montoF.localeCompare("") == 0 || montoF.localeCompare("0") == 0) {
          document.getElementById("labelModalF").innerHTML = "Por favor ingresar un monto valido";
        } else {
          $.ajax({
            type: "POST", url: "guardaFacturas.php",
            // Reemplaza con la URL correcta de tu archivo PHP 
            data: {
              matrizFacturas: JSON.stringify(matrizFacturas)
            },
            success: function (response) {
              // Puedes manejar la respuesta del servidor aquí si es necesario 
              console.log('Datos enviados al servidor:', response);
            }
          });
          // Actualizar la tabla con los datos de la matriz 
          document.getElementById("labelModalF").innerHTML = "Factura agregada existosamente";
          document.getElementById("nombreF").value = "";
          document.getElementById("codigoF").value = "";
          document.getElementById("montoF").value = "0";
          montoF = 0;
          document.getElementById("producto").value = "";
          document.getElementById("fechaF").value = "0000-00-00";
        }
      }
    }
  }
}