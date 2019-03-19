// Set data object for storage of todo and completed values
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) :  {
  todo: [],
  completed: [],
};

// Remove and complete icons HTML
let removeIcon = '<i class="far fa-trash-alt"></i>';
let completeIcon = '<i class="fas fa-check"></i>';

renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.querySelector('#add').addEventListener('click', function() {
  let value = document.querySelector('#item').value;
  if (value) {
    addItem(value);
  }
});

document.querySelector('#item').addEventListener('keydown', function(event) {
  let value = this.value;
  if (event.code === 'Enter' && value) {
    addItem(value);
  }
});

function addItem(value) {
  addItemToDOM(value);
  document.querySelector('#item').value = '';

  data.todo.push(value);
  dataObjectUpdated();
}

function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (let i = 0; i < data.todo.length; i++) {
    let value = data.todo[i];
    addItemToDOM(value);
  }

  for (let j = 0; j < data.completed.length; j++) {
    let value = data.completed[j];
    addItemToDOM(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }

  dataObjectUpdated();

  parent.removeChild(item);
}

function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }

  dataObjectUpdated();

  // Check if the item should be added to the completed list or re-added to the todo list
  let target = (id === 'todo') ? document.querySelector('#completed') : document.querySelector('#todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
  let list = (completed) ? document.querySelector('#completed') : document.querySelector('#todo');

  let item = document.createElement('li');
  item.innerText = text;

  let buttons = document.createElement('div');
  buttons.classList.add('todo__buttons');

  let remove = document.createElement('button');
  remove.classList.add('buttons__remove');
  remove.innerHTML = removeIcon;

  // Add event listener for removing an item
  remove.addEventListener('click', removeItem);

  let complete = document.createElement('button');
  complete.classList.add('buttons__complete');
  complete.innerHTML = completeIcon;

  // Add click event for completing items
  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

let menuButtons = document.querySelectorAll('.button');

menuButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    if (this.classList.contains('button--itemMenu')) {
      document.querySelector('.menu-panel').style.right = '0';
      document.querySelector('.list-panel').classList.add('opacity');
    } else if (this.classList.contains('button--listMenu')) {
      document.querySelector('.menu-panel').style.right = '-80%';
      document.querySelector('.list-panel').classList.remove('opacity');
    }
  });
});
