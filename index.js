function activateToDo() {

  let listItem = document.querySelector("#list__item");
  let list = document.querySelector("#list");
  let listItemHtml = listItem.innerHTML;
  let addItem = document.querySelector("#button--addition");

  addItem.addEventListener("click", function() {
    let div = document.createElement("div");
    div.className = "list__item";
    div.innerHTML = listItemHtml;
    list.appendChild(div);
  });


}
