<?php
	// Скрипт добавления нового пользователя
	// Подключаем файл с параметрами БД 
  require_once 'login.php';
  header("Content-Type: application/json; charset=UTF-8");
  $json = json_decode($_POST["x"], false);
	
	// Проверяем подключение к БД, создаем запрос 
	if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
		if ($check_username = mysqli_query($conn, "SELECT username FROM users WHERE username = '$json->login'")) {
			// Получаем строки и передаем в переменную 
			$rows = mysqli_num_rows($check_username);
			if ($rows > 0) {
				// Если кол-во строк больше 0, тогда выводим сообщение, что пользовтель существует
				echo json_encode('Пользователь с таким именем существует!');
			} else {
				// Иначе, создаем запрос на добавления пользователя в таблицу
				if ($result = mysqli_query($conn, "INSERT INTO users (username, password) VALUES ('$json->login', '$json->pass')")) {
					echo json_encode($result);
				}
			}
		}
		// Закрываем соединения
		mysqli_close($conn);
	} else {
		// иначе, выводим ошибку
		echo json_encode("Не удалось подключиться к БД");
	}
?>