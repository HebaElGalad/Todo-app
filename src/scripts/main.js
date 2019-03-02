// Save tasks in the locaalStorage
const appStorage = localStorage.getItem('todoList')
  ? JSON.parse(localStorage.getItem('todoList'))
  : [];

function storageUpdate() {
  localStorage.setItem('todoList', JSON.stringify(appStorage));
  console.log(appStorage);
}

// Create new tasks body
function addTask(value) {
  // Create list item
  const newTaskParent = document.createElement('li');
  newTaskParent.classList.add('todo-list__list-item');

  // Create button
  const newTask = document.createElement('button');
  newTask.classList.add('button', 'button--plain', 'todo-list__action-button');
  newTask.innerHTML = value;
  newTaskParent.appendChild(newTask);

  // Append new task to the ul list body
  document.querySelector('.todo-list').appendChild(newTaskParent);

  appStorage.push(value);
  storageUpdate();
}

function renderTodoList() {
  if (appStorage.length < 0) return;
  // if (appStorage.todo.length < 0 && appStorage.completed.length < 0) return;

  appStorage.forEach(item => addTask(item));
  // appStorage.completed.forEach(item => addTask(item.text));
}

//  Handel form '.create-task' submit
function formSubmit() {
  document.querySelector('.create-task__action-button').addEventListener('click', e => {
    e.preventDefault();
    // Add new tasks
    const text = document.querySelector('#add-task').value;
    if (text) {
      addTask(text);
    }
    // hide create-task container
    document.querySelector('#create-task').style.display = 'none';
  });
}

// Add new tasks
document.querySelector('.create-new-task').addEventListener('click', event => {
  event.stopPropagation();
  // change create-task container display
  document.querySelector('#create-task').style.display = 'block';
  formSubmit();
});

// Complete task
function taskCompleted(event) {
  // event.stopPropagation();
  console.log(event);
  const element = event.target;
  if (element.tagName === 'button') {
    element.classList.toggle('task-complete');
  }

  // const completedTask = this.classList.incldues('task-complete');
  // const value = this.innerHTML;

  // if (completedTask) {
  //   appStorage.todo.splice(appStorage.todo.indexOf(value), 1);
  //   appStorage.completed.push(value);
  // } else {
  //   appStorage.completed.splice(appStorage.completed.indexOf(value), 1);
  //   appStorage.todo.push(value);
  // }
}
document.querySelector('.todo-list').addEventListener('click', taskCompleted);

// const buttons = document.getElementsByClassName('todo-list__action-button');

// buttons.forEach(button => button.addEventListener('click', taskCompleted));

document.onload = renderTodoList();
