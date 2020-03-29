/* 
*   
*  Первая версия скрипта, написана без использования класса 
*
*/ 

// Конструктор MyApp 
const MyApp = function() {
	
	// геттер для формы входа 
	let authPanelGetter = function() {
		let authPanel = document.querySelector('.auth-panel')
		let regPanel = document.querySelector('.reg-panel')
		if (regPanel.style.display == 'inline-block') {
			authPanel.style.display = 'inline-block' 
			regPanel.style.display = 'none'
		} else {
			authPanel.style.display = 'inline-block'
		}
	}
	// сеттер для формы входа 
	this.authPanelSetter = function() {
		authPanelGetter()
	}


	// геттер для формы авторизации
	let regPanelGetter = function() {
		let authPanel = document.querySelector('.auth-panel')
		let regPanel = document.querySelector('.reg-panel')
		if (authPanel.style.display == 'inline-block') { 
			regPanel.style.display = 'inline-block'
			authPanel.style.display = 'none'
		} else {
			regPanel.style.display = 'inline-block'
		}
	}
	// сеттер для формы авторизации	
	this.regPanelSetter = function() {
		regPanelGetter()
	}
	
	
	// геттер для авторизации пользователя 
	let signInGetter = function() {
		let userPassObj = {
			'login' : document.querySelector('#user-input').value,
			'pass' : document.querySelector('#pass-input').value
		} 
		
		authorizeUser(userPassObj.login, userPassObj.pass)
	}
	// сеттер для авторазиции пользователя 
	this.signInSetter = function() {
		signInGetter()
	}
	
	
	// геттер для регистрации пользователя 
	let signUpGetter = function() {
		let userPassObj = {
			'login' : document.querySelector('#reg-user-input').value,
			'pass' : document.querySelector('#reg-pass-input').value
		}

		registrationUser(userPassObj.login, userPassObj.pass)	
	}
	// сеттер для регистрации пользователя
	this.signUpSetter = function() {
		signUpGetter()
	}


	// Метод создания новой задачи
	this.addTask = function() {
		content = document.querySelector('.content')
		let newTask = '<div class="new-task-form">'
		newTask += '<input type="text" class="task-name" placeholder="Введите название задачи">'
		newTask += '<button class="delete"></button>'
		newTask += '<button class="edit"></button>'
		newTask += '<button class="save"></button>'
		newTask += '</div>'
		
		content.insertAdjacentHTML('beforeend', newTask)
	
		// Кнопка и событие для сохранения задачи
		let saveButton = document.getElementsByClassName('save')
		for (let i = 0; i < saveButton.length; i++) {
			saveButton[i].addEventListener('click', ToDoApp.saveTask)
		}
		
		// Кнопка и событие для редактирования задачи 
		let editButton = document.getElementsByClassName('edit')
		for (let i = 0; i < editButton.length; i++) {
			editButton[i].addEventListener('click', ToDoApp.editTask)
		}
		
		// Кнопка и событие для удаление задачи 
		let deleteButton = document.getElementsByClassName('delete')
		for (let i = 0; i < deleteButton.length; i++) {
			deleteButton[i].addEventListener('click', ToDoApp.removeTask)
		}
	}
	
	
	// Метод сохранения задачи
	this.saveTask = function() {
		// Находим родительский элемент, затем его дочерний и меняем CSS-свойства
		let taskDiv = this.parentNode
		let taskName = taskDiv.getElementsByClassName('task-name')[0]
		taskName.disabled = 'false' 
		taskName.style.backgroundColor = 'white'
		taskName.style.fontWeight = 'bold'
		
		// Создаем объект со свойствами для передачи на сервер.
		let taskObj = {
			'username' : document.querySelector('.profile-name').innerHTML,
			'nametask' : taskName.value
		}
		
		// Отправляем запрос на сервер 
		let taskParams = JSON.stringify(taskObj)
		let xhr = new XMLHttpRequest() 
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let answer = JSON.parse(this.responseText)
				console.log(answer) 
			}
		}
		xhr.open('POST', '/myProjects/todolist/php/add_new_task.php', true)
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		xhr.send('x=' + taskParams)
	}
	
	
	// Метод редактирования задачи
	this.editTask = function() {
		// Находим родительский элемент, затем его дочерний и меняем CSS-свойства
		let taskDiv = this.parentNode
		let taskName = taskDiv.getElementsByClassName('task-name')[0]
		if (taskName.disabled) {
			taskName.disabled = false
			taskName.style.fontWeight = 'normal'
		}
	}
	
	
	// Метод удаления задачи 	
	this.removeTask = function() {
		// Находим родительский элемент, затем его дочерний и меняем CSS-свойства
		let taskDiv = this.parentNode
		let taskName = taskDiv.getElementsByClassName('task-name')[0]
		
		// Создаем объект со свойствами для передачи на сервер.
		let taskObj = {
			'username' : document.querySelector('.profile-name').innerHTML,
			'nametask' : taskName.value
		}
		
		// Отправляем запрос на сервер 
		let taskParams = JSON.stringify(taskObj)
		let xhr = new XMLHttpRequest() 
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let answer = JSON.parse(this.responseText)
				console.log(answer)
			}
		}
		xhr.open('POST', '/myProjects/todolist/php/remove_task.php', true)
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		xhr.send('x=' + taskParams)
		
		taskDiv.remove()
	}
	
	
	// Метод выход из приложения
	this.exitApp = function() {
		// Оторажаем кнопки "Войти" и "Зарегистироваться"
		loginButton.style.visibility = 'visible'
		regButton.style.visibility = 'visible'
		
		// Скрываем сайдбар 
		let sidebar = document.querySelector('.sidebar')
		sidebar.style.visibility = 'hidden' 
		
		// Удаляем отображение задач
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
}

// Авторизация пользователя в приложении
authorizeUser = (user, pass) => {
	
	// Создаем объект со свойствами для передачи на сервер
	let userPassObj = {
		'login' : user,
		'pass' : pass
	}
	
	// Отправляем запрос на сервер
	let userPassParam = JSON.stringify(userPassObj)
	let xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			let answer = JSON.parse(this.responseText)
			if (answer == 'Неверный логин или пароль!') {
				// Выводим ошибку о неверном логине или пароле 
				document.querySelector('.auth-answer').innerHTML = answer
			} else {
				// Иначе, авторизация прошла успешно
				let authPanel = document.querySelector('.auth-panel')
				let sidebar = document.querySelector('.sidebar')
				openApp(authPanel, sidebar) // Обращаемся к функции открытия приложения
				getProfileUsername(userPassObj.login) // Задаем текущее имя пользователя 
				loadMyTask() // Обращаемся к функции загрузки сохраненных задач на сервере
			}
		}
	}
	xhr.open('POST', '/myProjects/todolist/php/check_user.php', true)
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
	xhr.send('x=' + userPassParam)
} 

// Регистрация нового пользователя 
registrationUser = (user, pass) => {
	
	// Создаем объект со свойствами для передачи на сервер
	let userPassObj = {
		'login' : user,
		'pass' : pass
	}
	
	// Отправляем запрос на сервер
	let userPassParams = JSON.stringify(userPassObj)
	let xhr = new XMLHttpRequest() 
	xhr.onreadystatechange = function() {
		if (xhr.readyState = 4 && xhr.status == 200) {
			let answer = JSON.parse(this.responseText)
			if (answer == 'Пользователь с таким именем существует!') {
				document.querySelector('.reg-answer').innerHTML = answer
			} else if (answer) {
				let regPanel = document.querySelector('.reg-panel')
				let sidebar = document.querySelector('.sidebar')
				openApp(regPanel, sidebar) // Обращаемся к методу открытия приложения 
				getProfileUsername(userPassObj.login) // Задаем текущее имя пользователя 
			}
		}
	}
	xhr.open('POST', '/myProjects/todolist/php/new_user.php', true)
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
	xhr.send('x=' + userPassParams)
}

// Функция открытия приложения 
openApp = (signForm, sidebarPanel) => {
		signForm.style.display = 'none' // Скрываем отображение форм "Авторизации"\"Регистрации"
		sidebarPanel.style.visibility = 'visible' // Отображаем сайдар 
		// Скрываем кнопки "Войти" и "Зарегистрироваться"
		loginButton.style.visibility = 'hidden'
		regButton.style.visibility = 'hidden'
		
		// Кнопка и событие для выхода из приложения 
		let exitButton = document.querySelector('.logout')
		exitButton.addEventListener('click', ToDoApp.exitApp)
}

// Присваиваем profile-name имя текущего пользователя
getProfileUsername = (currentUsername) => {
	document.querySelector('.profile-name').innerHTML = currentUsername
}

// Загружаем сохраненные задачи пользователя 
loadMyTask = () => {	
	
		// Создаем объект со свойствами для передачи на сервер	
		let taskObj = {
			'username' : document.querySelector('#user-input').value,
		}
		
		// Отправляем на сервер запрос 
		let taskParams = JSON.stringify(taskObj)
		let xhr = new XMLHttpRequest() 
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let answer = JSON.parse(this.responseText)
					// Если на сервере есть сохраненные задачи, находим элемент "content"
					content = document.querySelector('.content')
					for (let i = 0; i < answer.length; i++) {
						// Для каждой задача создаем элементы с классами и добавляем на страницу
						let taskForm = document.createElement('div')
						taskForm.setAttribute('class', 'new-task-form')
						
						let taskInput = document.createElement('input')
						taskInput.setAttribute('class', 'task-name')
						taskInput.value = answer[i].taskname

						let save = document.createElement('button')
						save.setAttribute('class', 'save')
						save.addEventListener('click', ToDoApp.saveTask)
						
						let edit = document.createElement('button')
						edit.setAttribute('class', 'edit')
						edit.addEventListener('click', ToDoApp.editTask)
						
						let remove = document.createElement('button')
						remove.setAttribute('class', 'delete')
						remove.addEventListener('click', ToDoApp.removeTask)
						
						content.appendChild(taskForm)
						taskForm.appendChild(taskInput)
						taskForm.appendChild(remove)
						taskForm.appendChild(edit)
						taskForm.appendChild(save)
					}	
			}
		}
		xhr.open('POST', '/myProjects/todolist/php/load_tasks.php', true)
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		xhr.send('x=' + taskParams)
}


let ToDoApp = new MyApp()

// Кнопка и событие для входа в приложение
let loginButton = document.querySelector('.login-button')
loginButton.addEventListener('click', ToDoApp.authPanelSetter)

// Кнопка и событие для регистрации в приложении 
let regButton = document.querySelector('.reg-button')
regButton.addEventListener('click', ToDoApp.regPanelSetter)

// Кнопка и события для авторизации в приложении 
let authSubmit = document.querySelector('.auth-submit')
authSubmit.addEventListener('click', ToDoApp.signInSetter)

// Кнопка и событие для регистрации нового пользователя 
let regSubmit = document.querySelector('.reg-submit')
regSubmit.addEventListener('click', ToDoApp.signUpSetter) 

// Кнопка и событие для создания новой задачи 
let addTaskButton = document.querySelector('.add-task')
addTaskButton.addEventListener('click', ToDoApp.addTask)