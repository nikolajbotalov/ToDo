<?php
  /* Обращаемся к файлу login.php
  *  Создаем новое подлючение к БД
  *  Выводим ошибки при подключении
  */ 
  require_once 'login.php'; 
  $conn = new mysqli($hn, $un, $pw, $db); 
  if ($conn->connect_error) die ($conn->connect_error); 

  /* Создаем запрос на получение всех данных из БД
  /  Выполняет запрос 
  /  Выводим ошибки при запросе 
  */
  $query = "SELECT * FROM login";
  $result = $conn->query($query);
  if (!$result) die ($conn->error);

  $rows = $result->num_rows; // Создаем переменную для хранения строк

  for ($j = 0; $j < $rows; ++$j)  // Создаем цикл для перебора строк
  {
    $result->data_seek($j); // В каждую из строк
    $row = $result->fetch_array(MYSQLI_ASSOC); // Выбираем каждую из строк
    echo 'Пользователь: ' . $row['user'] . '<br>';
    echo 'Пароль: '       . $row['pass'] . '<br>';
  }

  $result->close(); 
  $conn->close(); // Закрываем соединение к БД
?>