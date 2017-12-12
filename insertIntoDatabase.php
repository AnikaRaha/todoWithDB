<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
	echo "connected <br>";
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//insert data
// if(isset($_POST['submit'])) {
	
// 	$name = $_POST['name'];
// 	$title = $_POST['title'];
// 	$done = $_POST['done'];
// 	$dueDate = $_POST['dueDate'];
// 	$priority = $_POST['priority'];

// 	$sql = "INSERT INTO events (name, title, done, dueDate, priority)
// 			VALUES ('$name', '$title', '$done', '$dueDate', '$priority')";

// 	if ($conn->query($sql) === TRUE) {
// 	    echo "New record created successfully";
// 	} else {
// 	    echo "Error: " . $sql . "<br>" . $conn->error;
// 	}

// }

//get data
/*$sql = "SELECT name, title, done, dueDate, priority FROM todolist";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "name: " . $row["name"]. " - title: " . $row["title"]. " " . $row["done"]. " ". $row["dueDate"]. " ". $row["priority"].  "<br>";
    }
} else {
    echo "0 results";
}*/




$conn->close();
?> 

<html>
<head>
	<title></title>
</head>
<body>
<?php 

	$todo_data = $_POST;
	echo "<script>console.log(" . $todo_data . ");</script>";
	echo "<script>console.log(" . json_encode($_POST) . ");</script>";

	// var_dump($_POST['name']);
	// echo json_encode($todo_data);
	// echo $todo_data['name']; 
	//$data = implode(", ", $todo_data);
	echo "<br>habijabi <br>";
	var_dump(json_encode($_POST) );
?>
</body>
</html>