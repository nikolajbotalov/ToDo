<?php
  require_once 'login.php';
  $conn = new mysqli($hn, $un, $pw, $db);
  if ($conn->connect_error) die ($conn->connect_error);

  header("Content-Type: application/json; charset=UTF-8");
  $json = json_decode($_POST["x"], false);
 
  $query = "INSERT INTO login (user, pass) VALUES ('$json->login', '$json->password')";
  $result = $conn->query($query);
  if (!$result) die ($conn->error);
?>