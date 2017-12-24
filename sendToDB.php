<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
	echo "connected   ";
	//echo " ";
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// insert data
if (isset($_POST['name']) && isset($_POST['title']) && isset($_POST['done']) && isset($_POST['dueDate']) && isset($_POST['priority'])) {
    $name = $_POST['name'];
    $title = $_POST['title'];
    $done = $_POST['done'];
    $dueDate = $_POST['dueDate'];
    $priority = $_POST['priority'];

    $sql = "INSERT INTO events (name, title, done, dueDate, priority)
            VALUES ('$name', '$title', '$done', '$dueDate', '$priority')";

    if ($conn->query($sql) === TRUE) {
        echo "New records created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

