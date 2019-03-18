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
  }
});

function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;

  parent.removeChild(item);
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

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}





// !!!!!! This was my own attempte at writing the code!!!!!!
// function activateToDo() {
//
//   let button = document.querySelector('button');
//   let input = document.querySelector('input');
//   let ul = document.querySelector('ul');
//   let item = document.querySelectorAll('li');
//
//   function inputLength() {
//     return input.value.length;
//   }
//
//   function listLength() {
//     return item.length;
//   }
//
//   function createListElement() {
//     let li = document.createElement('li');
//     li.appendChild(document.createTextNode(input.value));
//     ul.appendChild(li);
//     input.value = '';
//
//     function complete() {
//       li.classList.toggle('complete');
//     }
//
//     li.addEventListener('click', complete());
//
//     let deleteButton = document.createElement('button');
//     deleteButton.appendChild(document.createTextNode('X'));
//     li.appendChild(deleteButton);
//     deleteButton.addEventListener('click', deleteItem);
//
//     function deleteItem() {
//       li.classList.add('delete');
//     }
//   }
//
//   function addListAfterClick() {
//     if (inputLength() > 0) {
//       createListElement();
//     }
//   }
//
//   function addListAfterKeypress(event) {
//     if (inputLength() > 0 && event.keypress === 13) {
//       createListElement();
//     }
//   }
//
//   button.addEventListener('click', addListAfterClick());
//
//   input.addEventListener('keypress', addListAfterKeypress());
// }
