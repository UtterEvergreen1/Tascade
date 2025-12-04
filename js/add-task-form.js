// Get form input fields
const form = document.getElementById("addTaskForm");
const taskNameInput = document.getElementById("taskName");
const columnValueInput = document.getElementById("taskColumn");

form.addEventListener("submit", e => {
    // Prevent page reload on sumbit new task
    e.preventDefault();

    const name = taskNameInput.value.trim();
    if (!name) {
        taskNameInput.classList.add("input-error");
        taskNameInput.setAttribute("aria-invalid", "true");
        taskNameInput.focus();
        return;
    }
    taskNameInput.classList.remove("input-error");
    taskNameInput.removeAttribute("aria-invalid");

    // Create new task
    const task = { text: name, column: columnValueInput.value };
    // Load existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Redirect back to task board
    window.location.href = "index.html";
});