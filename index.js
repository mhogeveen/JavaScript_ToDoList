function activateToDo() {

  let list = document.querySelector("#list");
  let addItem = document.querySelector("#button--add");
  let removeItem = document.querySelector(".button--remove");
  let content = document.querySelector("#add__input");
  let listItemHtml = document.querySelector("#list__item").innerHTML;
  let existingItems = [1];
  let count = 1;

  function createItem() {
    let div = document.createElement("div");
    let newHTML = listItemHtml.split("placecontenthere").join(content.value);

    if (content.value) {
      content.value = '';
      count++;
      existingItems.push(count);
      content.style.border = "1px solid black";
      div.className = "list__item";
      div.innerHTML = newHTML;
      div.id = `item${existingItems[count - 1]}`;
      div.querySelector(".item__buttons > .button--remove").id = `remove${existingItems[count -1]}`;
      list.appendChild(div);
    } else {
      content.style.border = "1px solid red";
    }
  }

  removeItem.addEventListener("click", function() {


  });

  addItem.addEventListener("click", function() {
    createItem();
  });
}
