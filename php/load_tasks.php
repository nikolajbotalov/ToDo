<?php
	// Скрипт получения задач из БД
	// Подключаем файл с параметрами БД 
	require_once "login.php"; 
	header("Content-Type: application/json; charset=UTF-8");
	$json = json_decode($_POST['x'], false); 
	
	// Создаем массив для хранения строк
	$output = array();

	// Проверяем подключение к БД, создаем запрос 	
	if($conn = mysqli_connect($hn, $un, $pw, $db)) {
		if ($user_task = mysqli_query($conn, "SELECT taskname FROM tasks WHERE login = '$json->username'")) {
			// Записываем строки в ассоциативный массив
			while($rows = mysqli_fetch_assoc($user_task)) {
				$output[] = $rows;
			}
			echo json_encode($output);
		}
		// Закрываем соединения
		mysqli_close($conn);	
	} else {
		// иначе, выводим ошибку
		echo json_encode("Не удалось установить подключение к базе данных");
	}
?>
