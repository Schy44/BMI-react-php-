<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow specific domain
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies/sessions)
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Exit for OPTIONS requests
}

session_start();
include 'db_connect.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Fetch JSON data from React
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    $stmt = $conn->prepare("SELECT AppUserID, Password FROM AppUsers WHERE Username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($appUserID, $hashedPassword);
    $stmt->fetch();

    if ($hashedPassword && password_verify($password, $hashedPassword)) {
        $_SESSION['AppUserID'] = $appUserID;
        $_SESSION['Username'] = $username;
        $response['success'] = true;
        $response['message'] = 'Login successful';
    } else {
        $response['message'] = 'Invalid username or password';
    }

    $stmt->close();
    $conn->close();

    echo json_encode($response);
}
?>
