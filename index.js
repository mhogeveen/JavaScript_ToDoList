







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
