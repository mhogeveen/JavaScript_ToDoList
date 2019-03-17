function activateToDo() {

  let listItem = document.querySelector("#list__item");
  let list = document.querySelector("#list");
  let addItem = document.querySelector("#button--addition");


  addItem.addEventListener("click", function() {
    let div = document.createElement("div");
    let content = document.querySelector("#addition__input").value;

    let listItemHtml = `<div class="item__content">\
      <p>${content}</p>\
    </div>\
    <div class="item__buttons">\
      <button class="button button--edit" type="button" name="button">\
        <i class="far fa-edit"></i>\
      </button>\
      <button class="button button--remove" type="button" name="button">\
        <i class="far fa-times-circle"></i>\
      </button>\
    </div>`;

    console.log(content);
    div.className = "list__item";
    div.innerHTML = listItemHtml;
    list.appendChild(div);
  });


}
