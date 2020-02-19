<?php 
  // Подключаем к базе данных 
  require_once 'login.php';
  header("Content-Type: application/json; charset=UTF-8");
  $json = json_decode($_POST["x"], false);
	
	$output = array();

	if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
		if ($result = mysqli_query($conn, 'SELECT username FROM users')) {
			while ($row = mysqli_fetch_assoc($result)) {
				$output[] = $row;
			}
			mysqli_free_result($result);
			echo json_encode($output);
		}		
		mysqli_close($conn);
	}
	else 
	{
		echo 'Не удалось установить подключение к базе данных';
	}
  // Создаем запрос на проверку наличия пользователя в таблице
  // $check_user = "SELECT * FROM users WHERE username = '$json->login'";
  // $result_check = $conn->query($check_user);
  // $num = mysqli_num_rows($result_check);
  

  // if($num == 0) {
      // Если пользователя нет, то добавляем в таблицу 
      // $new_user_query = "INSERT INTO login (user, pass) VALUES ('$json->login', '$json->password')";
      // $result = $conn->query($new_user_query);
      // if($result) { echo "Вы зарегистрированы!"; }
      // else  { echo "Error"; }
  
  // }
  // else { echo "Пользователь с таким именем существует!"; }
?> 