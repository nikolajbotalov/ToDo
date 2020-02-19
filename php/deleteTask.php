<?php
  require_once 'login.php';
  header ('Content-Type: application/json; charset=UTF-8');
  $json = json_decode($_POST['x'], false); 

  if ($conn = mysqli_connect($hn, $un, $pw, $db)) {
    if ($result = mysqli_query($conn, "DELETE FROM users WHERE username = '$json->taskname'")) {
      echo json_encode($result);
    }
    mysqli_close($conn);
  } else {
    echo "Не удалось подключиться к базе данных";
  }
?>