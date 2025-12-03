const form = document.getElementById("addTaskForm");
const taskNameInput = document.getElementById("taskName");
const columnValueInput = document.getElementById("taskColumn");

form.addEventListener("submit", e => {
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

    const task = { text: name, column: columnValueInput.value };
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    window.location.href = "index.html"; // go back to board
});