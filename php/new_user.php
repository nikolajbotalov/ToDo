<?php
	// Скрипт добавления нового пользователя
  require_once 'login.php';
  header("Content-Type: application/json; charset=UTF-8");
  $json = json_decode($_POST["x"], false);
	
	if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
		if ($check_username = mysqli_query($conn, "SELECT username FROM users WHERE username = '$json->login'")) {
			$rows = mysqli_num_rows($check_username); 
			if ($rows > 0) {
				echo json_encode('Пользователь с таким именем существует!');
			} else {
				if ($result = mysqli_query($conn, "INSERT INTO users (username, password) VALUES ('$json->login', '$json->pass')")) {
					echo json_encode($result);
				}
			}
		}
		mysqli_close($conn);
	} else {
		echo json_encode("Не удалось подключиться к БД");
	}
?>