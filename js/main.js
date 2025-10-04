const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');
const dropDowns = document.querySelectorAll('.dropdown-content');
let draggedTask = null;

tasks.forEach(task => {
    task.setAttribute('draggable', 'true');
    task.addEventListener('dragstart', () => {
        draggedTask = task;
        setTimeout(() => task.style.display = "none", 0);
    });
    task.addEventListener('dragend', () => {
        draggedTask.style.display = "block";
        draggedTask = null;
    });
});

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
        if (draggedTask) column.appendChild(draggedTask);
    });
});

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

window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        dropDowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
}