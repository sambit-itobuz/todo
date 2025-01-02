const taskList = document.getElementById("task-list");
const inputTask = document.getElementById("task-input");
const localList = localStorage.getItem("todo");

let taskArray = [];

if (localList) {
  taskArray = JSON.parse(localList);
  showAll();
} else {
  localStorage.setItem("todo", JSON.stringify(taskArray));
}

function renderList(listTask) {
  const listItem = document.createElement("li");
  const para = document.createElement("p");
  para.textContent = listTask.value;
  para.setAttribute("class", "list-item-text");
  if (listTask.completed) {
    para.classList.add("text-decoration-line-through");
  }
  const completeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const tickImg = document.createElement("img");
  const deleteImg = document.createElement("img");
  const actionWrapper = document.createElement("div");
  completeBtn.setAttribute("class", "btn btn-outline-success list-item-button");
  deleteBtn.setAttribute("class", "btn btn-outline-danger list-item-button");
  tickImg.src = "./image/tickmark.png";
  deleteImg.src = "./image/bin.png";
  tickImg.setAttribute("class", "img-btn");
  deleteImg.setAttribute("class", "img-btn");
  completeBtn.appendChild(tickImg);
  deleteBtn.appendChild(deleteImg);
  completeBtn.setAttribute("onclick", "completeTask(this)");
  deleteBtn.setAttribute("onclick", "deleteTask(this)");
  actionWrapper.appendChild(completeBtn);
  actionWrapper.appendChild(deleteBtn);
  actionWrapper.setAttribute("class", "d-flex flex-nowrap");
  listItem.appendChild(para);
  listItem.appendChild(actionWrapper);
  listItem.setAttribute("class", "task-list-item");
  taskList.appendChild(listItem);
}

function addTask() {
  const task = inputTask.value.trim();

  if (task === "") {
    window.alert("Empty task cannot be added to list!");
  } else if (taskArray.findIndex((element) => element.value === task) !== -1) {
    window.alert("Task is already present in the list!");
  } else {
    const newTask = { value: task, completed: false };
    taskArray.push(newTask);
    renderList(newTask);
    localStorage.setItem("todo", JSON.stringify(taskArray));
  }
  inputTask.value = "";
}

function showAll() {
  taskList.innerHTML = "";
  taskArray.forEach((task) => renderList(task));
}

function showActive() {
  taskList.innerHTML = "";
  taskArray.forEach((task) => {
    if (!task.completed) {
      renderList(task);
    }
  });
}

function showCompleted() {
  taskList.innerHTML = "";
  taskArray.forEach((task) => {
    if (task.completed) {
      renderList(task);
    }
  });
}

function clearCompleted() {
  const clearConfirm = window.confirm(
    "Do you want to delete all the completed tasks?"
  );
  if (clearConfirm) {
    taskArray = taskArray.filter((task) => !task.completed);
    localStorage.setItem("todo", JSON.stringify(taskArray));
    showAll();
  }
}

function completeTask(task) {
  const taskElement = task.parentNode.parentNode.querySelector("p");
  taskElement.classList.toggle("text-decoration-line-through");
  const taskText = taskElement.textContent;
  const index = taskArray.findIndex((item) => item.value === taskText);
  taskArray[index].completed = !taskArray[index].completed;
  localStorage.setItem("todo", JSON.stringify(taskArray));
}

function deleteTask(task) {
  const taskText = task.parentNode.parentNode.textContent;
  const deleteConfirm = window.confirm(
    "Do you want to delete the task " + taskText + " ?"
  );
  if (deleteConfirm) {
    const index = taskArray.findIndex((item) => item.value === taskText);
    taskArray.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(taskArray));
    task.parentNode.parentNode.remove();
  }
}

document.getElementById("add-btn").addEventListener("click", addTask);
inputTask.addEventListener("keypress", (element) => {
  if (element.key === "Enter") addTask();
});
document.getElementById("all-btn").addEventListener("click", showAll);
document.getElementById("active-btn").addEventListener("click", showActive);
document
  .getElementById("completed-btn")
  .addEventListener("click", showCompleted);
document
  .getElementById("clr-completed-btn")
  .addEventListener("click", clearCompleted);
