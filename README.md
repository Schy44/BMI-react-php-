# BMI Application
Access the Registration Page:
Open your web browser and go to http://localhost:5173/register to access the registration page.


## Overview
This is a BMI (Body Mass Index) application built using PHP and React. 

## Getting Started

### Prerequisites
- **XAMPP**: Ensure you have XAMPP installed on your machine to run PHP and MySQL.
- **Node.js**: Install Node.js to run the React application.

### Project Setup

1. **PHP Setup**:
   - Place the `php` folder inside `xampp/htdocs`.
   - Open your XAMPP control panel and start the Apache and MySQL services.

2. **Create Database**:
   - Open phpMyAdmin (usually at `http://localhost/phpmyadmin`).
   - Create a new database named `BMI_PHP_APP`.
   - Run the following SQL commands to create the necessary tables:

   ```sql
   CREATE TABLE AppUsers (
       AppUserID INT AUTO_INCREMENT PRIMARY KEY,
       Username VARCHAR(50) NOT NULL UNIQUE,
       Password VARCHAR(255) NOT NULL,  
       CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE BMIUsers (
       BMIUserID INT AUTO_INCREMENT PRIMARY KEY,
       Name VARCHAR(100) NOT NULL,
       Age INT,
       Gender ENUM('Male', 'Female', 'Other'),
       CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE BMIRecords (
       RecordID INT AUTO_INCREMENT PRIMARY KEY,
       BMIUserID INT,
       Height FLOAT NOT NULL,
       Weight FLOAT NOT NULL,
       BMI FLOAT NOT NULL,
       RecordedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (BMIUserID) REFERENCES BMIUsers(BMIUserID) 
   );
React Setup:

Navigate to the React-Bmi folder:
cd React-Bmi
Install the required dependencies:
npm install
Start the development server:
npm run dev
The application will now be running, and you can access it in your browser at:
http://localhost:5173/


