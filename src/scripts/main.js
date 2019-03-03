// Save tasks in the locaalStorage
const appStorage = localStorage.getItem('todoList')
  ? JSON.parse(localStorage.getItem('todoList'))
  : [];

function storageUpdate() {
  localStorage.setItem('todoList', JSON.stringify(appStorage));
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

// Render localStorage each time you open the app
function renderTodoList() {
  if (appStorage.length < 0) return;
  appStorage.forEach(item => addTask(item));
}
renderTodoList();

// Complete task
function taskCompleted(event) {
  event.stopPropagation();
  this.classList.toggle('task-complete');
}

// Add taskCompleted event listener
const buttons = Array.from(document.getElementsByClassName('todo-list__action-button'));

buttons.forEach(button => button.addEventListener('click', taskCompleted));
//  Handel form '.create-task' submit
function formSubmit() {
  document.querySelector('.create-task__action-button').addEventListener('click', e => {
    e.preventDefault();
    // Add new tasks
    const text = document.querySelector('#add-task').value;
    if (text) {
      addTask(text);
    }
    document.querySelector('#add-task').value = '';
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
