<?php
    include('dbConnection.php');

    /*

    stripslashes function can be used to clean up data retrived from a database or from an HTML form.

    php://input - This is aread only stream that allows us to read raw data fro the request body. It 
    returns all the raw data after the HTTP-headers of the request, regardless of the content type

    json_decode - It takes JSON string and converts i into a php object or arrray, if treu then associative array




    */

    // only for insert ///////////////////////////////

    $data = stripslashes(file_get_contents("php://input"));
    $mydata = json_decode($data, true);

    $name = $mydata["name"];
    $email = $mydata["email"];
    $password = $mydata["password"];

    // To insert into the database

    if(!empty($name) && !empty($email) && !empty($password)) {
        $sql = "INSERT INTO student(name, email, password) VALUES ('$name', '$email', '$password')";
        if($conn->query($sql) == TRUE) {
            echo "Student Saved Successfully";
        } else {
            echo "Unable to Save Student";
        }
    } else {
        echo "Fill All Fields";
    }

    // only for insert end //////////////////















    /*
    // insert and update both start

    $data = stripslashes(file_get_contents("php://input"));
    $mydata = json_decode($data, true);

    // need id because we are updating also
    $id = $mydata['id'];

    $name = $mydata["name"];
    $email = $mydata["email"];
    $password = $mydata["password"];

    // To insert into the database

    if(!empty($name) && !empty($email) && !empty($password)) {
        $sql = "INSERT INTO student(id, name, email, password) VALUES ('$id', '$name', '$email', '$password') ON DUPLICATE KEY UPDATE name='$name', email='$email', password='$password'";
        if($conn->query($sql) == TRUE) {
            echo "Student Saved Successfully";
        } else {
            echo "Unable to Save Student";
        }
    } else {
        echo "Fill All Fields";
    }

    // insert and update both end

*/

?>

