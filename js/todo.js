class TODO {
  constructor() {}

  // Кнопки управления в приложении
  loginBtn = document.querySelector('.login-button')
  regBtn = document.querySelector('.reg-button')
  authSubmit = document.querySelector('.auth-submit')
  regSubmit = document.querySelector('.reg-submit')
  newTaskBtn = document.querySelector('.add-task')
  logoutBtn = document.querySelector('.logout')


  // Объект с 
  UIElements = {
    'authPanel': document.querySelector('.auth-panel'),
    'regPanel': document.querySelector('.reg-panel'),
    'userInput' : document.querySelector('#user-input'),
    'passInput': document.querySelector('#pass-input'),
    'regUserInput' : document.querySelector('#reg-user-input'),
    'regPassInput' : document.querySelector('#reg-pass-input'),
    'sidebar' : document.querySelector('.sidebar'), 
    'authError' : document.querySelector('.auth-answer'),
    'regError' : document.querySelector('.reg-answer'),
    'content' : document.querySelector('.content'),
    'profileName' : document.querySelector('.profile-name')
  }

  // Метод для вызова событий
  startEvents() {
    todoApp.loginBtn.addEventListener('click', todoApp.showAuthPanel)
    todoApp.regBtn.addEventListener('click', todoApp.showRegPanel)
    todoApp.authSubmit.addEventListener('click', todoApp.signInApp)
    todoApp.regSubmit.addEventListener('click', todoApp.signUpApp)
    todoApp.newTaskBtn.addEventListener('click', todoApp.addNewTask)
    todoApp.logoutBtn.addEventListener('click', todoApp.exitApp)
  }

  // Метод отображает панель авторизации
  showAuthPanel() {
    todoApp.UIElements.authPanel.style.display = 'block'
    todoApp.UIElements.regPanel.style.display = 'none'
  }

  // Метода 
  showRegPanel() {
    todoApp.UIElements.authPanel.style.display = 'none'
    todoApp.UIElements.regPanel.style.display = 'block'
  }

  // Метод авторизации в приложении 
  signInApp() {
    let authObj = {
      'login' : todoApp.UIElements.userInput.value,
      'pass' : todoApp.UIElements.passInput.value
    }

    let authParams = JSON.stringify(authObj)
    let xhr = new XMLHttpRequest() 
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let answer = JSON.parse(this.response)
        if (answer === 'Неверный логин или пароль!') {
          todoApp.UIElements.authError.innerHTML = answer
        } else {
          todoApp.loadTask()
          todoApp.openApp(authObj.login)
        }
      }
    }
    xhr.open('POST', '../toDoList/php/check_user.php', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send('x=' + authParams)
  }

  // Метод регистрации в приложении 
  signUpApp() {
    let regObj = {
      'login' : todoApp.UIElements.regUserInput.value,
      'pass' : todoApp.UIElements.regUserInput.value
    }

    let regParams = JSON.stringify(regObj)
    let xhr = new XMLHttpRequest() 
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let answer = JSON.parse(this.response)
        console.log(answer)
      }
    }
    xhr.open('POST', '../toDoList/php/new_user.php', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-unlercoded')
    xhr.send('x=' + regParams)
  }

  // Метод скрывает и отображает элементы управления приложением
  openApp(curUser) {
    todoApp.UIElements.sidebar.style.visibility = 'visible'
    todoApp.UIElements.authPanel.style.display = 'none'
    todoApp.UIElements.regPanel.style.display = 'none'
    todoApp.UIElements.profileName.innerHTML = curUser
    todoApp.loginBtn.style.visibility = 'hidden'
    todoApp.regBtn.style.visibility = 'hidden'
  }

  // Метод получения списка ранее сохраненных задач 
  loadTask() {
    let taskObj = {
      'login' : todoApp.UIElements.userInput.value,
    }

    let taskParams = JSON.stringify(taskObj)
    let xhr = new XMLHttpRequest() 
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let tasksName = JSON.parse(this.response)

        for (let i = 0; i < tasksName.length; i++) {
          // Создаем элементы и присваиваем им классы и вешаем события
          let taskDiv = document.createElement('div')
          taskDiv.className = 'new-task-form'
          let task = document.createElement('input')
          task.className = 'task-name'
          task.value = tasksName[i].taskname
          let save = document.createElement('button')
          save.className = 'save'
          save.addEventListener('click', todoApp.saveTask)
          let edit = document.createElement('button')
          edit.className = 'edit'
          edit.addEventListener('click', todoApp.editTask)
          let remove = document.createElement('button')
          remove.className = 'delete'
          remove.addEventListener('click', todoApp.removeTask)


          // добавляем элементы на страницу 
          todoApp.UIElements.content.appendChild(taskDiv)
          taskDiv.appendChild(task)
          taskDiv.appendChild(remove)
          taskDiv.appendChild(edit)
          taskDiv.appendChild(save)
        }
      }
    }
    xhr.open('POST', '../toDoList/php/load_tasks.php', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send('x=' + taskParams)
  }

  // Метода создания новой задачи
  addNewTask() {
    let saveBtn = document.getElementsByClassName('save')
    let editBtn = document.getElementsByClassName('edit')
    let deleteBtn = document.getElementsByClassName('delete')

    let newTask = '<div class="new-task-form">'
    newTask += '<input type="text" class="task-name" placeholder="Введите имя задачи">'
    newTask += '<button class="delete"></button>'
    newTask += '<button class="edit"></button>'
    newTask += '<button class="save"></button>'
    newTask += '</div>'
    todoApp.UIElements.content.insertAdjacentHTML('beforeend', newTask)

    // Назначаем кнопкам "Сохранить" события
    for (let i = 0; i < saveBtn.length; i++) {
      saveBtn[i].addEventListener('click', todoApp.saveTask)
    }

    // Назначаем кнопкам "Редактировать" события
    for (let i = 0; i < editBtn.length; i++) {
      editBtn[i].addEventListener('click', todoApp.editTask)
    }

    // Назначаем кнопка "Удалить" события 
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener('click', todoApp.removeTask)
    }
  }

  // Метод для сохранения задачи 
  saveTask() {
    let taskDiv = this.parentNode
    let taskname = taskDiv.getElementsByClassName('task-name')[0]
    taskname.style.fontWeight = 'bold'
    taskname.style.backgroundColor = 'white'
    taskname.disabled = 'true'

    let taskObj = {
      'username' : todoApp.UIElements.profileName.innerHTML,
      'nametask' : taskname.value
    }

    let taskParams = JSON.stringify(taskObj)
    let xhr = new XMLHttpRequest() 
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let answer = JSON.parse(this.response)
      }
    }
    xhr.open('POST', '../toDoList/php/add_new_task.php', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send('x=' + taskParams)
  }

  // Метод для редактирования задачи 
  editTask() {
    // Находим родительский элемент, затем его дочерний и меняем свойства
    let taskDiv = this.parentNode 
    let taskname = taskDiv.getElementsByClassName('task-name')[0]
    if (taskname.disabled) {
      taskname.disabled = false
      taskname.style.fontWeight = 'normal'
    }
  }

  // Метод для удаления задачи
  removeTask() {
    let taskDiv = this.parentNode
    let taskname = taskDiv.getElementsByClassName('task-name')[0]

    let taskObj = {
      'username' : document.querySelector('.profile-name').innerHTML, 
      'nametask' : taskname.value 
    }
    
    let taskParams = JSON.stringify(taskObj)
    let xhr = new XMLHttpRequest() 
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let answer = JSON.parse(this.response)
      }
    }
    xhr.open('POST', '../toDoList/php/remove_task.php', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send('x=' + taskParams)
    taskDiv.remove()
  }

  // Метод выхода из приложения 
  exitApp() {
    let taskDiv = document.querySelectorAll('.new-task-form')

    todoApp.UIElements.sidebar.style.visibility = 'hidden'
    todoApp.loginBtn.style.visibility = 'visible'
    todoApp.regBtn.style.visibility = 'visible'

    for (let i = 0; i < taskDiv.length; i++) {
      taskDiv[i].remove()
    }

    document.querySelector('#user-input').value = ''
    document.querySelector('#pass-input').value = '' 
    document.querySelector('#reg-user-input').value = '' 
    document.querySelector('#reg-pass-input').value = ''
  }
}

let todoApp = new TODO()
todoApp.startEvents()