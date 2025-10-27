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
    const darkLink = document.querySelector('link[href="css/DarkMode.css"]');
    const body = document.body;

    if (theme === "dark") {
        darkLink.disabled = false;
        body.classList.add("dark-mode");
    } else if (theme === "light") {
        darkLink.disabled = true;
        body.classList.remove("dark-mode");
    }
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