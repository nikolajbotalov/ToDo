<?php
	// Скрипт удаление задачи из таблицы tasks
  // Подключаемся к базе данных	
	require_once "login.php"; 
	header("Content-Type: application/json; charset=UTF-8");
	$json = json_decode($_POST["x"], false); 
	
	if($conn = mysqli_connect($hn, $un, $pw, $db)) {
		// Выполняем поиск задачи по имени пользователя и названию задачи
		if ($check_task = mysqli_query($conn, "SELECT login, taskname FROM tasks WHERE login = '$json->username' AND taskname = '$json->nametask'")) {
			// Объявляем переменную для хранения найденных строк
			$rows = mysqli_num_rows($check_task); 
			// Если строки найдены 
			if ($rows > 0) {
				// То производим их удаление
				if ($delete_task = mysqli_query($conn, "DELETE FROM tasks WHERE login = '$json->username' AND taskname = '$json->nametask'")) {
					echo json_encode("deleted");
				}
			}
		}
		// Закрываем подключение к БД 
		mysqli_close($conn);
	} else {
		echo json_encode("Не удалось подключиться к базе данных!");
	}
?>