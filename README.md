# ToDo 0.0.0.1 ver 

Основные возможности приложения: 
[+] Регистрация нового пользователя
[+] Авторизация под зарегистрированным пользователем 
[+] Создание новой задачи 
[+] Сохранение задачи 
[+] Редактирование задачи 
[+] Удаление задачи 
[+] Выход из приложения  

Приложение разворачивал на локальном сервере используя XAMPP. 
База данных: MariaDB 

Для полноценного тестирования приложения нужно создать базу данных и две таблицы в ней:

> CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (int),
  username VARCHAR(16) NOT NULL,
  password VARCHAR(16) NOT NULL
>) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_general_ci; 

>CREATE UNIQUE INDEX idx_username ON users (username);

>CREATE TABLE tasks (
  login VARCHAR(16) NOT NULL,
  countoftask INT NOT NULL,
  taskname VARCHAR(64) NOT NULL,
  CONSTRAINT `tasks_desc`
  FOREIGN KEY (login) REFERENCES users (username)
  ON DELETE CASCADE
>) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_general_ci;
