// * initial document Variables

const input_box = document.querySelector("input#input-box") as HTMLInputElement;
const todos_container = document.querySelector("ul#todos") as HTMLUListElement;
const noItems_div_element = document.querySelector(
  "div#noItems"
) as HTMLDivElement;
const clear_All_Todos_btn_elm = document.querySelector(
  "button#cats"
) as HTMLButtonElement;

// * Other Variables
const noDataFound_HTML: string = "<p>There are no todo items available.</p>";

// * Save Data
const saveData = (): void => {
  localStorage.setItem("data", todos_container.innerHTML);
};

// * Show Saved Data
const showData = (): void => {
  const savedData = localStorage.getItem("data");

  if (savedData) {
    todos_container.innerHTML = savedData;
    noItems_div_element.innerHTML = "";
  } else {
    noItems_div_element.innerHTML = noDataFound_HTML;
  }
};
showData();

// * Add Data
const addTask = (): void => {
  noItems_div_element.innerHTML = "";
  const task: string = input_box.value.trim();

  if (task === "") {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "todo_span";
  span.textContent = task;
  li.appendChild(span);

  const closeButton = document.createElement("button");
  closeButton.className = "close_icon";
  closeButton.innerHTML = `<i class="fas fa-times"></i>`;
  li.appendChild(closeButton);

  todos_container.appendChild(li);

  input_box.value = "";
  saveData();
};

// * todo container event Handler
todos_container.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  // * Item checked or unchecked
  if (target.tagName === "SPAN") {
    target.parentElement?.classList.toggle("checked");
  }
  // * Remove a Single item
  else if (target.tagName === "BUTTON" || target.tagName === "I") {
    const li = target.closest("li");
    li?.remove();

    if (todos_container.innerHTML.length == 0) {
      noItems_div_element.innerHTML = noDataFound_HTML;
    }
  }
  saveData();
});

// * Remove all data or clear all data
clear_All_Todos_btn_elm.addEventListener("click", () => {
  /// * If there are not todo item available to remove
  if (todos_container.innerHTML.length == 0) {
    alert("There are no todo items available");
    return;
  }

  const confirm = window.confirm("Do you want to RemoveClear all Todos");
  if (confirm) {
    todos_container.innerHTML = "";
    saveData();
    noItems_div_element.innerHTML = noDataFound_HTML;
  }
});
