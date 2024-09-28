<?php

include ('dbConnection.php');

// When you click to edit button below code get executed
$data = stripcslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['sid'];


// Retrive Specified Student Information
$sql = "SELECT * FROM student WHERE id = {$id}";
$result = $conn->query($sql);
$row = $result->fetch_assoc();


 // Returning json format data as response to Ajax Call
 echo json_encode($row);

?>