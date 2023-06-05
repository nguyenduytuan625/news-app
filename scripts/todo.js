'use strict';

// Selecting elements
const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todolistEl = document.getElementById('todo-list');

// Global variables
const todoArr = JSON.parse(getFromStorage('todoArr', '[]')).map(parseTask);
const currentUser = JSON.parse(getFromStorage('currentUser', '{}')).username;

// Functions
const validate = function (data) {
  if (!data.task) { alert('Please fill in Task'); }
  else if (!data.owner) { alert('Please log in'); }
  else { return true; }
  return false;
};
const clearInput = function () {
  taskInput.value = '';
}
const renderTasks = function () {
  todolistEl.innerHTML = '';
  todoArr.filter(todo => todo.owner === currentUser)
    .forEach(todo => {
      const html = `<li>${todo.task}<span class="close">×</span></li>`;
      todolistEl.insertAdjacentHTML('beforeend', html);
    });
};
const toggleTask = function (clickedEl) {
  clickedEl.classList.toggle('checked');
  const taskContent = clickedEl.textContent.slice(0, -1);
  const todo = todoArr.find(todo => todo.owner === currentUser && taskContent === todo.task);
  todo.isDone = clickedEl.classList.contains('checked');
  console.log(todo);
};
const deleteTask = function (clickedEl) {
  if (confirm('Are you sure to delete this task?')) {
    const taskContent = clickedEl.textContent.slice(0, -1);
    const index = todoArr.findIndex(todo => todo.owner === currentUser && taskContent === todo.task);
    todoArr.splice(index, 1);
    renderTasks();
    saveToStorage('todoArr', JSON.stringify(todoArr));
  }
};
const addTask = function () {
  const data = {
    task: taskInput.value,
    owner: currentUser,
    isDone: false
  };
  if (validate(data)) {
    const todo = new Task(data.task, data.owner, data.isDone);
    todoArr.push(todo);
    renderTasks();
    saveToStorage('todoArr', JSON.stringify(todoArr));
    clearInput();
  }
};

// Adding tasks
addBtn.addEventListener('click', function () {
  addTask();
});
document.addEventListener('keypress', function (e) {
  // console.log(e.key);
  if (e.key === 'Enter') { addTask(); }
})

// Toggling / Deleting tasks
todolistEl.addEventListener('click', function (e) {
  const clickedEl = e.target.closest('li');
  if (e.target.classList.contains('close')) { deleteTask(clickedEl); }
  else if (clickedEl) { toggleTask(clickedEl); }
});

// Initialization
const init = function () {
  todolistEl.innerHTML = '';
  if (currentUser) {
    renderTasks();
  }
};
init();

// localStorage.removeItem('todoArr');
// console.log(todoArr);
// console.log(currentUser);
