function activateToDo() {

  let list = document.querySelector("#list");
  let addItem = document.querySelector("#button--add");
  let removeItem = document.querySelector("#button--remove");
  let content = document.querySelector("#add__input");
  let listItemHtml = document.querySelector("#list__item").innerHTML;

  addItem.addEventListener("click", function() {
    let div = document.createElement("div");
    let contentVal = content.value;
    let newHTML = listItemHtml.split("placecontenthere").join(contentVal);

    if (contentVal) {
      content.style.border = "1px solid black";
      div.className = "list__item";
      div.innerHTML = newHTML;
      list.appendChild(div);
    } else {
      content.style.border = "1px solid red";
    }
  });

  removeItem.addEventListener("click", function() {
    list.removeChild("#list__item");
    console.log("hello");
  });
}
