<?php
  require_once 'login.php';
  header("Content-Type: application/json; charset=UTF-8");
  $json = json_decode($_POST["x"], false);
 
  if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
    if($result = mysqli_query($conn, "INSERT INTO users (username, password) VALUES ('$json->login', '$json->password')")) {
      // mysqli_free_result($result);
    }
    mysqli_close($conn);
  } else {
    echo "Не удалось установить подключение к базе данных";
  }
?>