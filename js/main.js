const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');
const dropDowns = document.querySelectorAll('.dropdown-content');
let draggedTask = null;

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => addTaskToBoard(task.text, task.column));
}

function deleteTask(taskElement) {
    taskElement.remove();
    updateLocalStorage();
}

function addTaskToBoard(text, columnId) {
    // create a new task element
    const task = document.createElement('div');
    task.className = 'task';
    task.draggable = true;

    // make the task element content
    const taskText = document.createElement('span');
    taskText.textContent = text;

    // create delete button
    const deleteButton = document.createElement('i');
    deleteButton.className = ' fa fa-trash delete-btn';
    deleteButton.onclick = () => deleteTask(task);

    // append text and delete button to task
    task.appendChild(taskText);
    task.appendChild(deleteButton);

    // add drag events
    addDragEvents(task);

    // append task to the specified column
    document.getElementById(columnId).appendChild(task);
}

function addDragEvents(task) {
    task.setAttribute('draggable', 'true');
    task.addEventListener('dragstart', () => {
        draggedTask = task;
        setTimeout(() => task.style.display = "none", 0);
    });
    task.addEventListener('dragend', () => {
        draggedTask.style.display = "block";
        draggedTask = null;
    });
}

columns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        column.classList.add('drag-over');
    });
    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });
    column.addEventListener('drop', () => {
        column.classList.remove('drag-over');
        if (draggedTask) {
            column.appendChild(draggedTask);
            updateLocalStorage();
        }
    });
});

function showAddTask() {
    // load add-task.html
    window.location.href = 'add-task.html';
}

function showDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

function showLockedMessage() {
    alert("This feature is locked. Complete more tasks to unlock it!");
}

function switchTheme(theme) {
    const body = document.body;
    const themeButton = document.getElementById("theme-button");
    if (theme === "dark") {
        themeButton.textContent = "Dark Mode";
    } else if (theme === "light") {
        themeButton.textContent = "Light Mode";
    }
    body.className = theme;
}

function updateLocalStorage() {
    const tasks = [];
    columns.forEach(column => {
        column.querySelectorAll('.task').forEach(task => {
            tasks.push({ text: task.textContent, column: column.id });
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();

window.onclick = e => {
    if (!e.target.matches('.dropbtn')) {
        dropDowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
}