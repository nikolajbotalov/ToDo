<?php 
  // Подключаем к базе данных 
  require_once 'login.php';
  $conn = new mysqli($hn, $un, $pw, $db);
  if ($conn->connect_error) die ($conn->connect_error);

  header("Content-Type: application/json; charset=UTF-8");
  $json = json_decode($_POST["x"], false);

  // Создаем запрос на проверку наличия пользователя в таблице
  $check_user = "SELECT * FROM login WHERE user = '$json->login'";
  $result_check = $conn->query($check_user);
  $num = mysqli_num_rows($result_check);
  

  if($num == 0) {
      // Если пользователя нет, то добавляем в таблицу 
      $new_user_query = "INSERT INTO login (user, pass) VALUES ('$json->login', '$json->password')";
      $result = $conn->query($new_user_query);
      if($result) { echo "Вы зарегистрированы!"; }
      else  { echo "Error"; }
  
  }
  else { echo "Пользователь с таким именем существует!"; }
?> 