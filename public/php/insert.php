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
<<<<<<< HEAD
$conexion = new mysqli("localhost", "id21129698_root", "Laurajavi1_", " id21129698_bodalaurajavier");
=======
$conexion = new mysqli("localhost", "root", "", "bodalaurajavier");
>>>>>>> b6242fe6f0a23d7f76928ecf91bf770bde0a2962

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

// Prepara la consulta SQL e inserta los datos
<<<<<<< HEAD
$sql = "INSERT INTO formulario (nombre, acompanado, nombreAcompanado, plazaBus, cantidadPlazaBus, alergia, alergiaAlimento, Menu, tipoMenu) 
=======
$sql = "INSERT INTO tabla (nombre, acompanado, nombreAcompanado, plazaBus, cantidadPlazaBus, alergia, alergiaAlimento, Menu, tipoMenu) 
>>>>>>> b6242fe6f0a23d7f76928ecf91bf770bde0a2962
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
