<?php
  // Удаление задачи
  // Подкючаемся к базе данных
  require_once 'login.php';
  header ('Content-Type: application/json; charset=UTF-8');
  $json = json_decode($_POST['x'], false); 

  // Если подключение прошло успешно 
  if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
    // Создаем запрос к таблице на удаление задачи 
    if ($result = mysqli_query($conn, "DELETE FROM users WHERE username = '$json->check_u'")) {
      echo json_encode($result);
    }
    // Закрываем соединение
    mysqli_close($conn);
  } else {
    // Иначе, выводим, что не удалось подключиться к базе данных 
    echo "Не удалось подключиться к базе данных";
  }
?>