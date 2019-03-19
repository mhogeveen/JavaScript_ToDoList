
let data = {
  todo: [],
  completed: [],
};

// Remove and complete icons HTML
let removeIcon = '<i class="far fa-trash-alt"></i>';
let completeIcon = '<i class="fas fa-check"></i>';

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.querySelector('#add').addEventListener('click', function() {
  let value = document.querySelector('#item').value;
  if (value) {
    addItemTodo(value);
    document.querySelector('#item').value = '';

    data.todo.push(value);
  }
});

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

  // Check if the item should be added to the completed list or re-added to the todo list
  let target = (id === 'todo') ? document.querySelector('#completed'):document.querySelector('#todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemTodo(text) {
  let list = document.querySelector('#todo');

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
