<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any domain, replace * with specific domain if needed
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json'); // Set JSON header

session_start();
include 'db_connect.php';

// Disable error reporting to prevent HTML errors in JSON response
error_reporting(0);

$message = "";

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get raw POST data
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true); // Decode JSON input

    // Check if JSON decoding was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON format"]);
        exit;
    }

    $username = $data['username'];
    $password = $data['password'];
    $age = $data['age'];
    $gender = $data['gender'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if username exists
    $checkUserStmt = $conn->prepare("SELECT Username FROM AppUsers WHERE Username = ?");
    $checkUserStmt->bind_param("s", $username);
    $checkUserStmt->execute();
    $checkUserStmt->store_result();

    if ($checkUserStmt->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Username already exists"]);
    } else {
        // Insert new user
        $stmt = $conn->prepare("INSERT INTO AppUsers (Username, Password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $hashedPassword);

        if ($stmt->execute()) {
            $appUserID = $stmt->insert_id;

            // Insert BMI user
            $stmtBMI = $conn->prepare("INSERT INTO BMIUsers (Name, Age, Gender) VALUES (?, ?, ?)");
            $stmtBMI->bind_param("sis", $username, $age, $gender);
            if ($stmtBMI->execute()) {
                echo json_encode(["status" => "success", "message" => "Account and BMI User created successfully"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Error creating BMI User: " . $stmtBMI->error]);
            }
            $stmtBMI->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Error creating account: " . $stmt->error]);
        }
        $stmt->close();
    }

    $checkUserStmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
