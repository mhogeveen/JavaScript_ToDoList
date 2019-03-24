// Set data object for storage of list items with there respective todo and completed values
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {};

// Remove and complete icons html
let removeIcon = '<i class="far fa-trash-alt"></i>';
let completeIcon = '<i class="fas fa-check"></i>';
let title = document.querySelector('.title__text');

renderLists();
renderTodo();

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
  if (!isEmpty()) {
    document.querySelector('.alert').style.display = 'none';
  }
});

// User pressed the enter key
document.querySelector('#categorie').addEventListener('keydown', function(event) {
  let value = this.value;
  if (event.code === 'Enter' && value) {
    addList(value);
  }
  if (!isEmpty()) {
    document.querySelector('.alert').style.display = 'none';
  }
});

// Update the data object
function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Check if data object is empty
function isEmpty(obj) {
  return Object.keys(data).length === 0;
}

// Check if a list is active
function isActive(obj) {
  let result;
  Object.keys(data).forEach(function(list) {
    if (data[list].active === true) {
      result = true;
    }
  });
  return result;
}

// Add item to list
function addItem(value) {
  addItemToDOM(value);
  document.querySelector('#item').value = '';

  Object.keys(data).forEach(function(list) {
    if (data[list].active === true) {
      data[list].todo.push(value);
    }
  });

  console.log(data);
  dataObjectUpdated();
}

// Add list to menu
function addList(value) {
  addListToDOM(value);
  let objectName = value;
  document.querySelector('#categorie').value = '';

  data[objectName] = {
    title: value,
    active: true,
    todo: [],
    completed: [],
  }

  Object.keys(data).forEach(function(list) {
    data[list].active = false;
  });

  data[objectName].active = true;

  dataObjectUpdated();
}

// Remove item from list
function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  Object.keys(data).forEach(function(list) {
    if (data[list].active === true) {
      if (id === 'todo') {
        data[list].todo.splice(data[list].todo.indexOf(value), 1);
      } else {
        data[list].completed.splice(data[list].completed.indexOf(value), 1);
      }
    }
  });

  dataObjectUpdated();

  parent.removeChild(item);
}

// Complete item or re-add to todo section of list
function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  Object.keys(data).forEach(function(list) {
    if (data[list].active === true) {
      if (id === 'todo') {
        data[list].todo.splice(data[list].todo.indexOf(value), 1);
        data[list].completed.push(value);
      } else {
        data[list].completed.splice(data[list].completed.indexOf(value), 1);
        data[list].todo.push(value);
      }
    }
  });

  dataObjectUpdated();

  // Check if the item should be added to the completed list or re-added to the todo list
  let target = (id === 'todo') ? document.querySelector('#completed') : document.querySelector('#todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Remove list from menu
function removeList() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  if (id === 'list') {
    delete data[value];
  }

  dataObjectUpdated();
  unrenderTodo();

  parent.removeChild(item);
}

// Change id of clicked list item to activeList
function activeList() {

  let item = this;
  let hasID = document.querySelector('#activeList');

  if (hasID) {
    hasID.id = '';
    this.id = 'activeList';
  } else {
    this.id = 'activeList';
  }

  Object.keys(data).forEach(function(list) {
    data[list].active = false;
  });

  data[item.innerText].active = true;

  unrenderTodo();
  renderTodo();
  dataObjectUpdated();
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
  let listItems = document.querySelectorAll('li');

  let item = document.createElement('li');
  item.innerText = text;

  let itemText = item.innerText;
  if (data[itemText]) {
    if (data[itemText].active === true) {
      item.id = 'activeList';
    }
  }

  let button = document.createElement('div');
  button.classList.add('list__buttons');

  let remove = document.createElement('button');
  remove.classList.add('buttons__remove');
  remove.innerHTML = removeIcon;

  // Add event listener for removing a list
  remove.addEventListener('click', removeList);

  // Add event listener for targeting a list
  item.addEventListener('click', activeList);

  button.appendChild(remove);
  item.appendChild(button);

  list.insertBefore(item, list.childNodes[0]);
}

// Render list contents
function renderTodo() {
  Object.keys(data).forEach(function(list) {
    if (data[list].active === true) {
      if (!data[list].todo.length && !data[list].completed.length) return;

      title.innerText = data[list].title;

      for (let i = 0; i < data[list].todo.length; i++) {
        let value = data[list].todo[i];
        addItemToDOM(value);
      }

      for (let j = 0; j < data[list].completed.length; j++) {
        let value = data[list].completed[j];
        addItemToDOM(value, true);
      }
    }
  });
}

// Unrender list contents
function unrenderTodo() {
  let todo = document.querySelector('#todo');
  let completed = document.querySelector('#completed');

  while (todo.firstChild) {
    todo.removeChild(todo.firstChild);
  }

  while (completed.firstChild) {
    completed.removeChild(completed.firstChild);
  }
}

// Render lists
function renderLists() {
  if (isEmpty(data)) return;

  for (let i = 0; i < Object.keys(data).length; i++) {
    let value = Object.keys(data)[i];
    addListToDOM(value);
  }
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
      if (isEmpty(data) || !isActive(data)) {
        document.querySelector('.alert--list').style.display = 'block';
        window.setTimeout(function() {
          document.querySelector('.alert--list').style.display = 'none';
        }, 2000);
      } else {
        document.querySelector('.menu-panel').style.right = '-100%';
        document.querySelector('.list-panel').style.opacity = '1';
      }
    }
  });
});

panelCover.addEventListener('click', function() {
  if (isEmpty(data) || !isActive(data)) {
    if (isEmpty(data)) {
      document.querySelector('.alert--list').style.display = 'block';
      window.setTimeout(function() {
        document.querySelector('.alert--list').style.display = 'none';
      }, 2000);
    } else {
      document.querySelector('.alert--active').style.display = 'block';
      window.setTimeout(function() {
        document.querySelector('.alert--active').style.display = 'none';
      }, 2000);
    }
  } else {
    document.querySelector('.menu-panel').style.right = '-100%';
    document.querySelector('.list-panel').style.opacity = '1';
  }
});
