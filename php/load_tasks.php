<?php
	require_once "login.php"; 
	header("Content-Type: application/json; charset=UTF-8");
	$json = json_decode($_POST['x'], false); 
	
	$output = array();

	if($conn = mysqli_connect($hn, $un, $pw, $db)) {
		if ($user_task = mysqli_query($conn, "SELECT taskname FROM tasks WHERE login = '$json->username'")) {
			while($rows = mysqli_fetch_assoc($user_task)) {
				$output[] = $rows;
			}
			echo json_encode($output);
		}	
	} else {
		echo json_encode("Не удалось установить подключение к базе данных");
	}
?>
