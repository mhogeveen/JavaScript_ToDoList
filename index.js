// Set data object for storage of list items with there respective todo and completed values
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {};

// Remove and complete icons html
let removeIcon = '<i class="far fa-trash-alt"></i>';
let completeIcon = '<i class="fas fa-check"></i>';

renderLists();

// If there is any text inside the item field, add that text to the todo list of it's own list object
// User clicked on the add button
document.querySelector('#add').addEventListener('click', function() {
  let value = document.querySelector('#item').value;
  if (value) {
    addItem(value);
  }
});

// User pressed the enter key
document.querySelector('#item').addEventListener('keydown', function(event) {
  let value = this.value;
  if (event.code === 'Enter' && value) {
    addItem(value);
  }
});

// If there is any text inside the categorie field, add that text to the todo list of it's own list object
// User clicked on the categorie button
document.querySelector('#cat-add').addEventListener('click', function() {
  let value = document.querySelector('#categorie').value;
  if (value) {
    addList(value);
  }
});

// User pressed the enter key
document.querySelector('#categorie').addEventListener('keydown', function(event) {
  let value = this.value;
  if (event.code === 'Enter' && value) {
    addList(value);
  }
});

function addItem(value) {
  addItemToDOM(value);
  document.querySelector('#item').value = '';
}

function addList(value) {
  addListToDOM(value);
  let objectName = value;
  document.querySelector('#categorie').value = '';

  data[objectName] = {
    todo: [],
    completed: [],
  }

  dataObjectUpdated();
  console.log(data);
}

function renderTodo() {

}

function renderLists() {
  if (!Object.keys(data).length) return;

  for (let i = 0; i < Object.keys(data).length; i++) {
    let value = Object.keys(data)[i];
    addListToDOM(value);
  }
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {

}

function removeList() {

}

function completeItem() {

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

// Adds new item to the lists list
function addListToDOM(text) {
  let list = document.querySelector('#list');

  let item = document.createElement('li');
  item.innerText = text;

  let button = document.createElement('div');
  button.classList.add('list__buttons');

  let remove = document.createElement('button');
  remove.classList.add('buttons__remove');
  remove.innerHTML = removeIcon;

  // Add event listener for removing a list
  remove.addEventListener('click', removeList);

  button.appendChild(remove);
  item.appendChild(button);

  list.insertBefore(item, list.childNodes[0]);
}

// Check if data object is empty
function isEmpty(obj) {
  return Object.keys(data).length === 0;
}

// Menu sliding functionality
let menuButtons = document.querySelectorAll('.button');
let panelCover = document.querySelector('.panel__cover');

menuButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    if (this.classList.contains('button--itemMenu')) {
      document.querySelector('.menu-panel').style.right = '0';
      document.querySelector('.list-panel').style.opacity = '0.5';
    } else if (this.classList.contains('button--listMenu')) {
      if (isEmpty(data)) {
        document.querySelector('.alert').style.display = 'block';
      } else {
        document.querySelector('.menu-panel').style.right = '-100%';
        document.querySelector('.list-panel').style.opacity = '1';
      }
    }
  });
});

panelCover.addEventListener('click', function() {
  if (isEmpty(data)) {
    document.querySelector('.alert').style.display = 'block';
  } else {
    document.querySelector('.menu-panel').style.right = '-100%';
    document.querySelector('.list-panel').style.opacity = '1';
  }
});
