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

function loginUser() {
	// Отображем сайдбар 
	let sidebar = document.querySelector('.sidebar')
	sidebar.style.visibility = 'visible' 
	
	// Скрываем панель элемент входа пользователя 
	let authPanel = document.querySelector('.auth-panel')
	authPanel.style.display = 'none' 
	
	// Скрываем кнопки "Войти" и "Зарегистрироваться"
	loginButton.style.visibility = 'hidden'
	regButton.style.visibility = 'hidden'
  

  // Объект для хранения вводимого логина\пароля  
  let userPassObj = {
    "login" : "", 
    "password" : "",
  }

  let userInput = document.getElementById('user-input').value
  let passInput = document.getElementById('pass-input').value

  userPassObj.login = userInput
  userPassObj.password = passInput 

  let userPassParams = JSON.stringify(userPassObj)
  xhr = new XMLHttpRequest() 
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let answerPanel = document.querySelector('.answer-panel')
      answerPanel.style.display = 'inline-block'
      document.getElementById('answer').innerHTML = this.responseText

    }
  }
  xhr.open("POST", "/myProjects/todolist/php/checkUser.php", true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhr.send("x=" + userPassParams); 

  // Это дерьмо не работает, переписать!!!!
  if (xhr.responseText == 'Пользователь с таким именем существует!') {
    console.log('work')
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
  
  // document.getElementById('user-input').value = ""
  // document.getElementById('pass-input').value = ""
	
  // Объект для хранения вводимого логина\пароля  
  var userPassObj = {
    login: '',
    password: ''
  }

  let userInput = document.getElementById('reg-user-input').value
  let passInput = document.getElementById('reg-pass-input').value

  userPassObj.login = userInput
  userPassObj.password = passInput

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
  xhr.open("POST", "/myProjects/todolist/php/checkUser.php", true);
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
}

// Редактирование задачи
function editTask() {
  
  // Находим родительский элемент, затем его дочерний, 
  // если задизаблен, то даем возможность редактировать
  let taskDiv = this.parentNode;
  let taskName = taskDiv.firstChild
  if (taskName.disabled) {
    taskName.disabled = false
  }
}

// // Удаление задачи
function removeTask() {

  // Находим родительский элемент, затем его удаляем
  let taskDiv = this.parentNode;
  taskDiv.remove()
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
// // События для вызова формы авторизации
// let authSubmit = document.getElementById('auth-submit');
// authSubmit.addEventListener('click', newUser);

// function newUser() {
//   // Объект для хранения вводимого логина\пароля  
//   var userPassObj = {
//     login: '',
//     password: ''
//   }

//   let userInput = document.getElementById('user-input').value
//   let passInput = document.getElementById('pass-input').value

//   userPassObj.login = userInput
//   userPassObj.password = passInput

//   // Передача данных на сервер через JSON
//   userPassParam = JSON.stringify(userPassObj);
//   xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//           myObj = JSON.parse(this.responseText);
//           for (x in myObj) {
//               txt += myObj[x].name + "<br>";
//           }
//       }
//   };
//   xmlhttp.open("POST", "/myProjects/todolist/php/new_user.php", true);
//   xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xmlhttp.send("x=" + userPassParam);
// }

// // Вызвать\спрятать Сайдбар
// let sidebarButton = document.getElementById('sidebar-button') 
// sidebarButton.addEventListener('click', showCloseSideBar) 

// function showCloseSideBar() {
//   let sidebarMenu = document.getElementById('sidebar-menu');
//   let content = document.getElementById('content') 

//   if (sidebarMenu.style.display == 'none') {
//     sidebarMenu.style.display = 'inline'
//     sidebarButton.setAttribute('title', 'Закрыть меню')
//     sidebarButton.style.transform = 'scale(-1, 1)'
//     sidebarMenu.style.width = '250px'
//     content.style.marginLeft = '250px';
//   } else {
//     sidebarMenu.style.display = 'none'
//     sidebarButton.setAttribute('title', 'Открыть меню')
//     sidebarButton.style.transform = 'scale(1, 1)'
//     sidebarMenu.style.width = '0px'
//     content.style.marginLeft = '0px'
//   }
// }

// // Добавление задачи 
// let newTaskButton = document.getElementById('add-new-task')
// newTaskButton.addEventListener('click', showTaskForm)

// function showTaskForm() {
//   let addTask = document.getElementById('task-new')
//   addTask.style.visibility = 'visible'

//   let taskText = document.getElementsByClassName('task-text').value
//   let taskDesc = document.getElementsByClassName('task-desc').value

//   document.addEventListener('keydown', function(e) {
//     if (e.keyCode == '27' && addTask.style.visibility == 'visible') {
//       addTask.style.visibility = 'hidden'
//     }
//   })

//   let createTask = document.getElementById('create-task')
//   createTask.addEventListener('click', createTsk) 

//   function createTsk() {
//     const nTsk = document.createElement('div')
//     nTsk.className = 'n-task'
//     document.body.appendChild(nTsk)
//   }
// }



// // Смена изображения профиля 
// // Написать позже... 

// // Скрытие и отображение формы авторизации 
// let loginButton = document.getElementById('login-button');
// loginButton.addEventListener('click', showAuthForm);

// function showAuthForm() {
//   let authForm = document.getElementById('auth-form');
//   if (authForm.style.visibility == 'hidden') {
//     authForm.style.visibility = 'visible'
//   } else {
//     console.log('well done') 
//     authForm.style.visibility = 'hidden'
//   }  
