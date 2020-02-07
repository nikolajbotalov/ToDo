let content = document.querySelector('.content')

let p_menuButton = document.querySelector('.profile-menu-button')
p_menuButton.addEventListener('click', showProfilePanel)

function showProfilePanel() {
  let sidebarPanel = document.querySelector('.sidebar-panel')
  if (sidebarPanel.style.left == '-225px') {
    sidebarPanel.style.left = '0px'
    let newTask = document.querySelector('.add-task')
    newTask.addEventListener('click', addTask)
    this.style.transform = 'scale(-1, 1)';
  } else {
    sidebarPanel.style.left = '-225px'
    this.style.transform = 'scale(1, 1)';
  }
}

// Добавление новой задачи 
function addTask() {

  let createTaskForm = '<div class="new-task-form">'
  createTaskForm += '<input type="text" class="task-name" placeholder="Введите имя задачи" maxlength="64">'
  createTaskForm += '<textarea rows="3" class="task-description" placeholder="Введите описание задачи..."></textarea>'
  createTaskForm += '<button class="delete"></button>'
  createTaskForm += '<button class="edit"></button>'
  createTaskForm += '<button class="save"></button>'
  createTaskForm += '</div>'

  content.insertAdjacentHTML('beforeend', createTaskForm)

  // Событие для сохранение задачи
  let saveButton = document.getElementsByClassName('save')
  for (let i = 0; i < saveButton.length; i++) {
    console.log('click')
    saveButton[i].addEventListener('click', saveTask)
  }

  // Событие для удаления задачи
  let deleteButton = document.querySelector('.delete')
  deleteButton.addEventListener('click', removeTask)
}

// Сохранение задачи  
function saveTask() {
  let taskName = document.querySelector('.task-name') 
  taskName.disabled = true
  taskName.style.fontWeight = 'bold'

  let descriptionTask = document.querySelector('.task-description')
  descriptionTask.disabled = true 
  descriptionTask.style.fontWeight = 'bold';

  // Событие для редактирование задачи 
  if (taskName.disabled) {
    let editButton = document.querySelector('.edit')
    editButton.addEventListener('click', editTask)
  }
}
// Редактирование задачи
function editTask() {
  let nameTask = document.querySelector('.task-name')
  nameTask.disabled = false
  nameTask.style.fontWeight = 'normal'

  let descriptionTask = document.querySelector('.task-description')
  descriptionTask.disabled = false
  descriptionTask.style.fontWeight = 'normal'
}

// Удаление задачи
function removeTask() {
  let taskForm = document.getElementsByClassName('new-task-form')
  for (let i = 0; i < taskForm.length; i++) {
    taskForm[i].addEventListener('click', function(e) {
      e.target = this.remove()
    })
  }
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
// }