<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['AppUserID'])) {
    header("Location: login.php");
    exit();
}

$username = htmlspecialchars($_SESSION['Username']);
$greeting = '';
$bmi = null;
$message = '';
$imgSrc = '';
$calorieIntake = 0;
$carbs = $protein = $fat = $fiber = $sugar = 0;

$hour = date('H');
if ($hour < 12) {
    $greeting = "Good Morning, $username!";
} elseif ($hour < 18) {
    $greeting = "Good Afternoon, $username!";
} else {
    $greeting = "Good Evening, $username!";
}

$healthTips = [
    "Stay hydrated and eat balanced meals!",
    "Regular exercise helps maintain a healthy BMI.",
    "Consistency is key—track your progress!",
    "Sleep well for better overall health.",
    "Small steps today lead to big changes tomorrow.",
];
$randomTip = $healthTips[array_rand($healthTips)];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $weight = isset($_POST['weight']) ? (float)$_POST['weight'] : '';
    $height = isset($_POST['height']) ? (float)$_POST['height'] : '';
    $activityLevel = isset($_POST['activity_level']) ? (float)$_POST['activity_level'] : 1;

    if ($weight <= 0 || $height <= 0) {
        $message = "Please enter a valid weight and height";
    } else {
        $totalInches = $height;
        $heightInMeters = $totalInches * 0.0254;

        $bmi = $weight / ($heightInMeters ** 2);
        $bmi = round($bmi, 1);

        if ($bmi < 18.5) {
            $message = 'You are underweight';
            $imgSrc = 'images/underweight.png';
        } elseif ($bmi < 25) {
            $message = 'You are healthy';
            $imgSrc = 'images/healthy.png';
        } elseif ($bmi < 30) {
            $message = 'You are overweight';
            $imgSrc = 'images/overweight.png';
        } else {
            $message = 'You are obese';
            $imgSrc = 'images/obese.png';
        }

        $age = 25;
        $bmr = (10 * $weight) + (6.25 * ($height * 2.54)) - (5 * $age);
        $calorieIntake = $bmr * $activityLevel;

        $carbs = $calorieIntake * 0.50 / 4;
        $protein = $calorieIntake * 0.20 / 4;
        $fat = $calorieIntake * 0.25 / 9;
        $fiber = $calorieIntake * 0.05 / 4;
        $sugar = $calorieIntake * 0.10 / 4;
    }
}
?>