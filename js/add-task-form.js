// Get form input fields
const taskNameInput = $("#taskName");
const taskNameError = $("#taskNameError");
const columnValueInput = $("#taskColumn");

$("#addTaskForm").on("submit", e => {
    // Prevent page reload on sumbit new task
    e.preventDefault();

    const name = taskNameInput.val().trim();
    if (!name) {
        taskNameInput.addClass("input-error");
        taskNameInput.attr("aria-invalid", "true");
        taskNameError.removeClass("d-none");
        taskNameInput.focus();
        return;
    }
    taskNameInput.removeClass("input-error");
    taskNameError.addClass("d-none");
    taskNameInput.removeAttr("aria-invalid");

    // Create new task
    const task = { text: name, column: columnValueInput.val() };
    // Load existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Redirect back to task board
    window.location.href = "index.html";
});