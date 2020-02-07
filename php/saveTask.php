<?php
    $hostname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "publications";

    $link = new mysqli($hostname, $username, $password, $dbname);
    if ($link->connect_error) die($link->connect_error);

    $query = "SELECT * FROM users";
    $result = $link->query($query);
    if (!$result) die($link->error);

    $rows = $result->num_rows;

    for ($j = 0; $j < $rows; ++$j) {
        echo "$rows";
    }

    $result->close();
    $link->close();
?>
