<?php

header("Access-Control-Allow-Origin: *");  // Allow requests from any domain, replace * with specific domain if needed
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();
session_destroy();
echo json_encode(["status" => "success", "message" => "Logged out successfully"]);
?>
