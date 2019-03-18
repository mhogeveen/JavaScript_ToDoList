function activateToDo() {

  let list = document.querySelector("#list");
  let addItem = document.querySelector("#button--add");
  let removeItem0 = document.querySelector("button[name='remove0']");
  let content = document.querySelector("#add__input");
  let listItemHtml = document.querySelector("#list__item").innerHTML;
  let existingItems = 0;

  addItem.addEventListener("click", function() {
    let div = document.createElement("div");
    let contentVal = content.value;
    let newHTML = listItemHtml.split("placecontenthere").join(contentVal);

    if (contentVal) {
      existingItems++;
      console.log(existingItems);
      content.style.border = "1px solid black";
      div.className = `list__item item${existingItems}`;
      div.innerHTML = newHTML;
      list.appendChild(div);
    } else {
      content.style.border = "1px solid red";
    }
  });

  removeItem0.addEventListener("click", function() {

    console.log("hello");
    list.removeChild("div.template");
  });
}
