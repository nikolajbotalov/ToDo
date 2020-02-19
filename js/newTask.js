let authPanel = document.querySelector('.auth-panel')
let regPanel = document.querySelector('.reg-panel')

// При нажатии на Esc убираем окно авторизации или регистрации 
document.addEventListener('keydown', function(e) {
  if (e.keyCode == '27' && (authPanel.style.display == 'inline-block' || 
                            regPanel.style.display == 'inline-block')) {
    authPanel.style.display = 'none'
    regPanel.style.display = 'none'
  }
})

// Cобытие отображения окна авторизации 
let loginButton = document.querySelector('.login-button')
loginButton.addEventListener('click', showLoginPanel) 

// Отображаем элемент входа пользователя
function showLoginPanel() {
  if (regPanel.style.display == 'inline-block') {
    authPanel.style.display = 'inline-block' 
    regPanel.style.display = 'none'
  } else {
    authPanel.style.display = 'inline-block'
  }
	
	// Событие отображения сайдбара
	let authSubmit = document.querySelector('.auth-submit') 
	authSubmit.addEventListener('click', loginUser) 
}

// Авторизация в приложении
function loginUser() {

  // Объект для хранения вводимого логина\пароля  
  let userPassObj = {
    "login" : document.getElementById('user-input').value, 
    "password" : document.getElementById('pass-input').value
  }
	
	// Отображем сайдбар 
	let sidebar = document.querySelector('.sidebar')
	sidebar.style.visibility = 'visible' 
		
	// Скрываем панель элемент входа пользователя 
	let authPanel = document.querySelector('.auth-panel')
	authPanel.style.display = 'none' 
		
	// Скрываем кнопки "Войти" и "Зарегистрироваться"
	loginButton.style.visibility = 'hidden'
	regButton.style.visibility = 'hidden'
		
	let userPassParams = JSON.stringify(userPassObj)
	xhr = new XMLHttpRequest() 
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let answer = JSON.parse(this.responseText)
			loadMyTask(answer)
		}
	}
	xhr.open("POST", "/myProjects/todolist/php/checkUser.php", true)
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhr.send("x=" + userPassParams); 
}

// Получения задач с сервера 
function loadMyTask(jsonObj) {	
	for (let i = 0; i < jsonObj.length; i++) {
		let newTaskForm = document.createElement('div')
		newTaskForm.setAttribute('class', 'new-task-form')
		
		let input = document.createElement('input')
		input.setAttribute('class', 'task-name')
		input.value = jsonObj[i].username
		
		let save = document.createElement('button')
		save.setAttribute('class', 'save')
		save.addEventListener('click', saveTask)
		
		let edit = document.createElement('button')
		edit.setAttribute('class', 'edit')
		edit.addEventListener('click', editTask)
		
		let remove = document.createElement('button')
		remove.setAttribute('class', 'delete')
		remove.addEventListener('click', removeTask)
		
		content.appendChild(newTaskForm)
		newTaskForm.appendChild(input)
		newTaskForm.appendChild(remove)
		newTaskForm.appendChild(edit)
		newTaskForm.appendChild(save)	
	}
}

// Cобытие отображения окна регистрации 
let regButton = document.querySelector('.reg-button') 
regButton.addEventListener('click', showRegPanel) 

function showRegPanel() {
  // Отображем элемент для регистрации пользователя
  if (authPanel.style.display == 'inline-block') { 
    regPanel.style.display = 'inline-block'
    authPanel.style.display = 'none'
  } else {
    regPanel.style.display = 'inline-block'
  }

	// Событие для регистрации пользователя
	let regSubmit = document.querySelector('.reg-submit')
	regSubmit.addEventListener('click', regNewUser)
}

// Регистрация нового пользователя 
function regNewUser() {
	
	// Скрываем кнопки "Войти" и "Зарегистрироваться"
	loginButton.style.visibility = 'hidden'
  regButton.style.visibility = 'hidden'

	
  // Объект для хранения вводимого логина\пароля  
  var userPassObj = {
    "login" : document.getElementById('reg-user-input').value,
    "password" : document.getElementById('reg-pass-input').value
  }

  // Передача данных на сервер через JSON
  let userPassParam = JSON.stringify(userPassObj);
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let myObj = JSON.parse(this.responseText);
          for (x in myObj) {
              txt += myObj[x].name + "<br>";
          }
      }
  };
  xhr.open("POST", "/myProjects/todolist/php/new_user.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("x=" + userPassParam);
}



// Объявляем переменную для хранения основной элемента страницы
let content = document.querySelector('.content')

let newTask = document.querySelector('.add-task')
newTask.addEventListener('click', addTask)

// Добавление новой задачи 
function addTask() {

  // Объявляем переменную для хранения блока
  // с элементами новой задачи
  let createTaskForm = '<div class="new-task-form">'
  createTaskForm += '<input type="text" class="task-name" placeholder="Введите название задачи">'
  createTaskForm += '<button class="delete"></button>'
  createTaskForm += '<button class="edit"></button>'
  createTaskForm += '<button class="save"></button>'
  createTaskForm += '</div>'  

  // Добавляем на страницу
  content.insertAdjacentHTML('beforeend', createTaskForm)

  // Событие для сохранение задачи
  let saveButton = document.getElementsByClassName('save')
  for (let i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener('click', saveTask)
  }

  // Событие для редактирования задачи
  let editButton = document.getElementsByClassName('edit')
  for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener('click', editTask)
  }
	
	// Событие для удаления задачи
  let deleteButton = document.getElementsByClassName('delete') 
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', removeTask)
  }	
}

// Сохранение задачи  
function saveTask() {

  // Находим родительский элемент, затем его дочерний и дизаблим
  let taskDiv = this.parentNode
  let taskName = taskDiv.getElementsByClassName('task-name')[0]
  taskName.disabled = 'false' 
	taskName.style.backgroundColor = 'white'
	taskName.style.fontWeight = 'bold'
}

// Редактирование задачи
function editTask() {
  
  // Находим родительский элемент, затем его дочерний, 
  // если задизаблен, то даем возможность редактировать
  let taskDiv = this.parentNode;
  let taskName = taskDiv.getElementsByClassName('task-name')[0]
  if (taskName.disabled) {
    taskName.disabled = false
		taskName.style.fontWeight = 'normal'
  }
}




// // Удаление задачи
function removeTask() {

  // Находим родительский элемент, затем его удаляем
  let taskDiv = this.parentNode;
  let taskInput = taskDiv.getElementsByClassName('task-name')[0]


  let taskObj = {
    "taskname" : taskInput.value
  } 

  let taskParams = JSON.stringify(taskObj)
  xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let answer = this.responseText
      console.log(answer)
      // taskDiv.remove()  
    }
  }
  xhr.open('POST', '/myProjects/todolist/php/deleteTask.php', true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhr.send('x=' + taskParams)
}


// Событие выхода из приложения 
let logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', logout) 

// Выход из приложения 
function logout(){
	loginButton.style.visibility = 'visible'
	regButton.style.visibility = 'visible'
	
	let sidebar = document.querySelector('.sidebar')
	sidebar.style.visibility = 'hidden' 
	
	let myTasks = document.querySelectorAll('.new-task-form')
	for (let i = 0; i < myTasks.length; i++) {
		myTasks[i].remove()
  } 
  
  // Очищаем инпуты 
  document.getElementById('user-input').value = ""
  document.getElementById('pass-input').value = ""
  document.getElementById('reg-user-input').value = ""
  document.getElementById('reg-pass-input').value = ""
}
