<?php
include('dbConnection.php');


// Retrieve Student Information
$sql = "SELECT * FROM student";
$result = $conn->query($sql);
if($result -> num_rows > 0) {
    $data = array(); // make this variable as array type
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
// Returning JSON Format Data as Response to Ajax Call
echo json_encode($data);

?>