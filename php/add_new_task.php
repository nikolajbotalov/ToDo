<?php
	// Скрипт записи новой задачи в таблицу tasks 
	// Подключаем файл с параметрами БД 
	require_once "login.php";
	header("Content-Type: application/json; charset=UTF-8");
	$json = json_decode($_POST["x"], false); 
	
	if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
		if ($result = mysqli_query($conn, "INSERT INTO tasks(login, countoftask, taskname) VALUES ('$json->username', '$json->numbertask', '$json->nametask')")) {
			echo json_encode($result);
		}
		mysqli_close($conn);
	} else {
		echo json_encode("Не удалось установить подключение к базе данных");
	}
?>