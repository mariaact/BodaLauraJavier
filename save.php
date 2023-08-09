<?php
$nombre = $_GET['nombre'];
$acompanamiento = $_GET['acompanado'];
$plazaBus = $_GET['plazaBus'];


$servername = "localhost";
$username = " root";
$password = '';
$dbname = "bodalaurajavier";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
   die("Conexión fallida: " . $conn->connect_error);
}

$sql = "INSERT INTO tabla (nombre, acompañamiento, plazaBus) VALUES ('$nombre', '$acompanamiento', '$plazaBus')";

if ($conn->query($sql) === TRUE) {
    echo "Datos guardados correctamente";
} else {
    echo "Error al guardar los datos: " . $conn->error;
}

$conn->close();
?>
