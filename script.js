"use strict";
// * initial document Variables
const input_box = document.querySelector("input#input-box");
const todos_container = document.querySelector("ul#todos");
const noItems_div_element = document.querySelector("div#noItems");
const clear_All_Todos_btn_elm = document.querySelector("button#cats");
// * Other Variables
const noDataFound_HTML = "<p>There are no todo items available.</p>";
// * Save Data
const saveData = () => {
    localStorage.setItem("data", todos_container.innerHTML);
};
// * Show Saved Data
const showData = () => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        todos_container.innerHTML = savedData;
        noItems_div_element.innerHTML = "";
    }
    else {
        noItems_div_element.innerHTML = noDataFound_HTML;
    }
};
showData();
// * Add Data
const addTask = () => {
    noItems_div_element.innerHTML = "";
    const task = input_box.value.trim();
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
    var _a;
    const target = e.target;
    // * Item checked or unchecked
    if (target.tagName === "SPAN") {
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("checked");
    }
    // * Remove a Single item
    else if (target.tagName === "BUTTON" || target.tagName === "I") {
        const li = target.closest("li");
        li === null || li === void 0 ? void 0 : li.remove();
        if (todos_container.innerHTML.length == 0) {
            noItems_div_element.innerHTML = noDataFound_HTML;
        }
    }
    saveData();
});
// * Remove all data or clear all data
clear_All_Todos_btn_elm.addEventListener("click", () => {
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
