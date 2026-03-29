<?php
// db_connect.php — Database connection config

$host     = "localhost";
$username = "root";
$password = "";          // Default XAMPP password is empty
$database = "student_db";

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("<p style='color:red;'>Connection failed: " . mysqli_connect_error() . "</p>");
}
?>
