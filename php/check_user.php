<?php 
  // Подключаем к базе данных 
  require_once 'login.php';
  header("Content-Type: application/json; charset=UTF-8");
  $json = json_decode($_POST["x"], false);
	
	$output = array();

	if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
		if ($check_user = mysqli_query($conn, "SELECT username, password FROM users WHERE username = '$json->login' AND password = '$json->pass'")) {
			$rows = mysqli_num_rows($check_user); 
			if ($rows > 0) {
				echo json_encode("Пользователь существует.");
				// Написать получение списка задач пользователей
			} else {
				echo json_encode("Неверный логин или пароль!");
			}
		}
	mysqli_close($conn);
	}
	else 
	{
		echo json_encode("Не удалось установить подключение к базе данных");
	}
?> 