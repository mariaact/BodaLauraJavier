<?php

$nombre = $argv[1];
$acompanado = $argv[2];
$nombreAcompanado = $argv[3];
$plazaBus = $argv[4];
$cantidadPlazaBus = $argv[5];
$alergia = $argv[6];
$alergiaAlimento = $argv[7];
$Menu = $argv[8];
$tipoMenu = $argv[9];


// Realiza la conexión a la base de datos
$conexion = new mysqli("localhost", "id21129698_root", "Laurajavi1_", " id21129698_bodalaurajavier");

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

// Prepara la consulta SQL e inserta los datos
$sql = "INSERT INTO formulario (nombre, acompanado, nombreAcompanado, plazaBus, cantidadPlazaBus, alergia, alergiaAlimento, Menu, tipoMenu) 
        VALUES ('$nombre', '$acompanado', '$nombreAcompanado', '$plazaBus', '$cantidadPlazaBus', '$alergia', '$alergiaAlimento', '$Menu', '$tipoMenu')";

if ($conexion->query($sql) === TRUE) {
    session_start();
    $_SESSION['success_message'] = "Registro insertado correctamente.";
    echo "Registro insertado correctamente";
} else {
    echo "Error al insertar en la base de datos: " . $conexion->error;
}

// Cierra la conexión
$conexion->close();
?>
