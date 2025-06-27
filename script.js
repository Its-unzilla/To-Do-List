let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDark = JSON.parse(localStorage.getItem("darkMode")) || false;

const taskList = document.getElementById("taskList");
const toggleThemeBtn = document.getElementById("toggleTheme");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTheme() {
  localStorage.setItem("darkMode", JSON.stringify(isDark));
}

function applyTheme() {
  document.body.classList.toggle("dark", isDark);
  toggleThemeBtn.textContent = isDark ? "☀️" : "🌙";
}

toggleThemeBtn.addEventListener("click", () => {
  isDark = !isDark;
  applyTheme();
  saveTheme();
});

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleComplete(index);
    li.appendChild(checkbox);

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    li.appendChild(taskText);

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.onclick = () => deleteTask(index);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const newTask = input.value.trim();
  if (newTask) {
    tasks.push({ text: newTask, completed: false });
    saveTasks();
    displayTasks();
    input.value = "";
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
  }
}

function clearAll() {
  if (tasks.length === 0) return alert("No tasks to clear.");
  if (confirm("Delete all tasks?")) {
    tasks = [];
    saveTasks();
    displayTasks();
  }
}

applyTheme();
displayTasks();
