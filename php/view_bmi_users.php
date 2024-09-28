<?php

header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow specific domain
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies/sessions)
header('Content-Type: application/json');
session_start();

// Debug output to check session
error_log("Session data: " . print_r($_SESSION, true)); // Logs session information

include 'db_connect.php';

// Check if the user is logged in
if (!isset($_SESSION['AppUserID'])) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit();
}

// Fetch BMI users
$sql = "SELECT BMIUserID, Name, Age, Gender FROM BMIUsers";
$resultUsers = $conn->query($sql);

// Check for errors
if (!$resultUsers) {
    die(json_encode(["error" => "Error fetching BMI users: " . $conn->error]));
}

// Fetch users as an associative array
$users = $resultUsers->fetch_all(MYSQLI_ASSOC);
// Corrected PHP response with status
echo json_encode(["status" => "success", "users" => $users]);

?>
