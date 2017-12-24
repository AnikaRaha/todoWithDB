<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$arr = $_POST['updatedTodos'];
$someArray = json_decode($arr, true);
//print_r($someArray[0]["name"]);

$sql1 = "TRUNCATE events";

if ($conn->query($sql1) === TRUE) {
    //echo "New records created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


for ($i=0; $i < sizeof($someArray) ; $i++) { 
	$name = $someArray[$i]["name"];
    $title = $someArray[$i]["title"];
    $done = $someArray[$i]["done"];
    $dueDate = $someArray[$i]["dueDate"];
    $priority = $someArray[$i]["priority"];
	
	$sql2 = "INSERT INTO events (name, title, done, dueDate, priority)
            VALUES ('$name', '$title', '$done', '$dueDate', '$priority')";

    if ($conn->query($sql2) === TRUE) {
        //echo "New records created successfully";
    } else {
        echo "Error: " . $sql2 . "<br>" . $conn->error;
    }
}

