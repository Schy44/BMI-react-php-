<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['AppUserID']) || !isset($_GET['bmi_user_id'])) {
    header("Location: login.php");
    exit();
}

$bmiUserID = $_GET['bmi_user_id'];
$stmt = $conn->prepare("SELECT RecordID, Height, Weight, BMI, RecordedAt FROM BMIRecords WHERE BMIUserID = ?");
$stmt->bind_param("i", $bmiUserID);
$stmt->execute();
$result = $stmt->get_result();

// Fetch user's name for display
$userStmt = $conn->prepare("SELECT Name FROM BMIUsers WHERE BMIUserID = ?");
$userStmt->bind_param("i", $bmiUserID);
$userStmt->execute();
$userResult = $userStmt->get_result();
$userRow = $userResult->fetch_assoc();
$username = htmlspecialchars($userRow['Name']);

// Calculate health tips based on the last record
$healthTips = "";
if ($row = $result->fetch_assoc()) {
    $bmi = $row['BMI'];
    if ($bmi < 18.5) {
        $healthTips = "Your BMI indicates that you are underweight. Consider consulting a healthcare provider for dietary recommendations.";
    } elseif ($bmi >= 18.5 && $bmi < 24.9) {
        $healthTips = "Great job! Your BMI is within a healthy range. Maintain your healthy lifestyle.";
    } elseif ($bmi >= 25 && $bmi < 29.9) {
        $healthTips = "You are in the overweight category. Incorporate regular physical activity and a balanced diet.";
    } else {
        $healthTips = "Your BMI indicates obesity. It's advisable to seek guidance from a healthcare provider for personalized advice on weight management.";
    }

    // Move the pointer back to the first record
    $result->data_seek(0);
} else {
    $healthTips = "No BMI records found for this user.";
}

// Pass data to React component
$bmiRecords = [];
while ($row = $result->fetch_assoc()) {
    $bmiRecords[] = $row;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View BMI Records for <?php echo $username; ?></title>
    <link rel="stylesheet" href="bmi_styles.css">
</head>
<body>
    <div id="root"></div>

    <script>
        var username = <?php echo json_encode($username); ?>;
        var bmiRecords = <?php echo json_encode($bmiRecords); ?>;
        var healthTips = <?php echo json_encode($healthTips); ?>;
    </script>
    <script src="bmi_records.js"></script>
</body>
</html>
